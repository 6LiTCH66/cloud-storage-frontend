import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import "./dashboardHeader.scss"
import {AiOutlineCloudUpload} from "react-icons/ai";
import AWS from "aws-sdk"
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;
import {Files} from "../../types/Files";
import {delete_file, upload_file} from "../../http/filesAPI";
import { v4 as uuidv4 } from 'uuid';

import {RootState, useAppDispatch} from "../../store/store";
import {addFiles, deleteFiles, setFileId, setFileProgress} from "../../store/filesSlice";
import {addFolder} from "../../store/folderSlice";

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import s3 from "../../utils/aws_s3"
import toast from "react-hot-toast";
import {userLogin} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {GrUploadOption, GrAddCircle} from "react-icons/gr";
import { MdOutlineKeyboardArrowDown, MdOutlineUploadFile, MdOutlineDriveFolderUpload} from "react-icons/md"
import {FolderJSON} from "../../types/FolderJSON";
import {useQueryClient, useMutation} from "react-query";
import {upload_folder} from "../../http/folderAPI";

function DashboardHeader() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient()



    const navigate = useNavigate()
    const { file_id } = useSelector(
        (state: RootState) => state.filesSlice
    );

    const handleFileInputClick = () => {
        if (fileInputRef.current) {

            fileInputRef.current.click();
        }
    };


    const handleFolderInputClick = () => {
        if (folderInputRef.current) {
            folderInputRef.current.click();
        }
    };


    const dispatch = useAppDispatch()
    const defaultDispatch = useDispatch()


    const checkFileType = (file: File): string => {
        if (file.type.startsWith('image/')){
            return "image"
        }else{
            return "file"
        }
    };

    const makeFilename = (file_name: string) => {
        const uniqueId = uuidv4();
        return `${uniqueId}_${file_name}`;
    }

    const mutation = useMutation({
        mutationFn: upload_file,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folderDetails'] })
        },
    })

    const mutationFolder = useMutation({
        mutationFn: upload_folder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folderDetails'] })
        },
    })

    const uploadFile = (file: File) => {

        const fileName = makeFilename(file.name)

        const params: AWS.S3.PutObjectRequest = {
            Bucket: 'cloud-storage-bucket-ilja',
            Key: fileName,
            Body: file,
        };

        toast.promise(
            new Promise<void>((resolve, reject) => {

                s3.upload(params)
                    .on('httpUploadProgress', (progress) => {
                        defaultDispatch(setFileProgress(Math.round((progress.loaded / progress.total) * 100)));
                    })
                    .send((err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }

                        const fileType = checkFileType(file);

                        const fileUpload: Files = {
                            file_name: file.name,
                            file_type: fileType,
                            file_location: data.Location,
                            aws_file_name: fileName,
                            size: file.size,
                        }

                        mutation.mutate(fileUpload);

                        defaultDispatch(setFileProgress(null))
                        resolve();

                    });
            }),
            {
                loading: 'Uploading file...',
                success: 'File uploaded successfully',
                error: 'File upload failed',
            },
            {
                position: 'top-center',
            }
        );



    };



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (file) {
            uploadFile(file);
            event.target.value = ""
        }
    };
    const processFiles = async (files: FileList | null) => {
        if (!files) return;

        const folders: FolderJSON[] = Array.from(files).reduce((acc: FolderJSON[], file) => {


            const pathParts = file.webkitRelativePath.split('/');

            // Extract the file name part of the path
            const fileName = pathParts.pop();
            const aws_file_name = makeFilename(file.name);

            const params: AWS.S3.PutObjectRequest = {
                Bucket: 'cloud-storage-bucket-ilja',
                Key: file.webkitRelativePath.replace(file.name, aws_file_name),
                Body: file,
            };

            let currentFolderLevel = acc;
            let currentFolder: FolderJSON | undefined;

            pathParts.forEach((folderName) => {
                let existingFolder = currentFolderLevel.find((folder) => folder.folder_name === folderName);

                if (!existingFolder) {
                    existingFolder = {
                        folder_name: folderName,
                        files: [],
                        folders: [],
                    };

                    currentFolderLevel.push(existingFolder);
                }

                currentFolder = existingFolder;
                currentFolderLevel = existingFolder.folders;
            });

            let newFile: Files = {
                aws_file_name: aws_file_name,
                file_location: "",
                file_name: fileName || '',
                file_type: checkFileType(file),
                size: file.size

            };


            s3.upload(params)
                .on('httpUploadProgress', (progress) => {
                    // console.log(Math.round((progress.loaded / progress.total) * 100))
                })
                .send((err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                });

            const file_url_params = {
                Bucket: 'cloud-storage-bucket-ilja',
                Key: file.webkitRelativePath.replace(file.name, aws_file_name),
                Expires: null
            };

            let objectUrl = s3.getSignedUrl('getObject', file_url_params);

            let endPos = objectUrl.indexOf(encodeURIComponent(aws_file_name));

            if (endPos != -1) {
                objectUrl = objectUrl.substring(0, endPos + encodeURIComponent(aws_file_name).length);
            }


            newFile.file_location = objectUrl


            if (currentFolder && currentFolder.files) {
                currentFolder.files.push(newFile);
            }

            return acc;
        }, []);

        return folders;
    }


    const handleFolderChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;


        if (!files) return;
        const processedFolders: FolderJSON[] | undefined = await processFiles(files);

        if (processedFolders){

            // dispatch(addFolder(processedFolders[0]))

            mutationFolder.mutate(processedFolders[0]);


        }

    };



    const handleDeleteFile = () => {

        if (file_id){
            toast.promise(
                dispatch(deleteFiles(file_id)),
                {
                    loading: 'Deleting file...',
                    success: "Congratulations! You have successfully deleted file",
                    error: "Sorry, something went wrong while deleting file!",
                },
                {
                    position: 'top-center',
                }
            );


            defaultDispatch(setFileId([]))

        }else{
            console.log("no file id")

        }

    }


    return (
        <nav className="flexmb-4 px-5 py-3 mb-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <input

                type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>

            <input
                /* @ts-expect-error */
                directory=""
                webkitdirectory=""

                type="file" ref={folderInputRef} style={{ display: 'none' }} onChange={handleFolderChange}/>

            <ol className="flex justify-between items-center space-x-1 md:space-x-3">

                <li className="inline-flex items-center">

                    <div className="create-folder">
                        <GrAddCircle size={24}/>
                        <span>Create a folder</span>
                    </div>

                    <div className="uploader_container">

                        <div className="upload-button">
                            <GrUploadOption size={24}/>
                            <span>Upload...</span>
                            <MdOutlineKeyboardArrowDown size={20}/>
                        </div>





                        <div className="uploader_dropdown">
                            <div className="dropdown-menu_links_uploader">
                                <a onClick={handleFolderInputClick}>
                                    <MdOutlineDriveFolderUpload size={23}/>
                                    <span>Upload folder</span>
                                </a>

                                <a onClick={handleFileInputClick}>
                                    <MdOutlineUploadFile size={23}/>
                                    <span>Upload file</span>
                                </a>

                            </div>
                        </div>

                    </div>


                </li>
                <li className="inline-flex items-center">

                    {file_id.length ? (
                        <button type="button"
                                disabled={file_id.length <= 0} onClick={handleDeleteFile}
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">

                        <svg fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                        </svg>

                    </button>
                    ): <></>}

                </li>

            </ol>
        </nav>
        // <div className="dashboard-header">
        //     <div className="file_upload">
        //
        //         <button onClick={handleButtonClick} type="button" className="upload-file-btn">
        //             <AiOutlineCloudUpload size={25} color={"#FFFFFF"}/>
        //             <span>Upload a file</span>
        //         </button>
        //
        //         <button type="button" className="upload-file-btn delete-btn" style={{backgroundColor: file_id.length <= 0 ? "#EABDBC" : ""}} disabled={file_id.length <= 0} onClick={handleDeleteFile}>
        //             <span>Delete</span>
        //         </button>
        //
        //         <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
        //     </div>
        // </div>
    );
}

export default DashboardHeader;