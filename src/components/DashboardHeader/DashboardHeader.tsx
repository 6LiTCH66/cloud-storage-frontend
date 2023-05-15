import React, {useRef} from 'react';
import "./dashboardHeader.scss"
import {AiOutlineCloudUpload} from "react-icons/ai";
import AWS from "aws-sdk"
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;
import {Files} from "../../types/Files";
import {delete_file} from "../../http/filesAPI";
import { v4 as uuidv4 } from 'uuid';

import {RootState, useAppDispatch} from "../../store/store";
import {addFiles, deleteFiles, setFileId, setFileProgress} from "../../store/filesSlice";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";

function DashboardHeader() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { file_id } = useSelector(
        (state: RootState) => state.filesSlice
    );

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const dispatch = useAppDispatch()
    const defaultDispatch = useDispatch()

    AWS.config.update({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "",
        },
    });

    const s3 = new AWS.S3();

    const checkFileType = (file: File): string => {
        if (file.type.startsWith('image/')){
            return "image"
        }else{
            return "file"
        }
    };



    const uploadFile = (file: File) => {
        const uniqueId = uuidv4();
        const fileName = `${uniqueId}_${file.name}`;

        const params: AWS.S3.PutObjectRequest = {
            Bucket: 'cloud-storage-bucket-ilja',
            Key: fileName,
            Body: file,
        };

        s3.upload(params)
            .on('httpUploadProgress', (progress) => {
                defaultDispatch(setFileProgress(Math.round((progress.loaded / progress.total) * 100)));
                // console.log('Upload progress:', Math.round((progress.loaded / progress.total) * 100) + '%');
            })
            .send((err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                if (err) {
                    console.log(err);
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

                dispatch(addFiles(fileUpload))
                defaultDispatch(setFileProgress(null))


                console.log('File uploaded successfully');
            });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (file) {
            uploadFile(file);
            event.target.value = ""
        }
    };

    const handleDeleteFile = () => {

        if (file_id){

            dispatch(deleteFiles(file_id))
            defaultDispatch(setFileId([]))

        }else{
            console.log("no file id")

        }

    }




    return (
        <div className="dashboard-header">
            <div className="file_upload">

                <button onClick={handleButtonClick} type="button" className="upload-file-btn">
                    <AiOutlineCloudUpload size={25} color={"#FFFFFF"}/>
                    <span>Upload a file</span>
                </button>

                <button type="button" className="upload-file-btn delete-btn" style={{color: file_id.length <= 0 ? "#fff": "blue"}} disabled={file_id.length <= 0} onClick={handleDeleteFile}>
                    <span>Delete</span>
                </button>

                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
            </div>
        </div>
    );
}

export default DashboardHeader;