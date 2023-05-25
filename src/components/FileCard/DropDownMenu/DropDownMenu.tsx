import React, {useEffect, useRef, useState} from "react";
import "./dropDownMenu.scss"
import {RiDeleteBin6Line} from "react-icons/ri"
import {MdOutlineDownloadForOffline} from "react-icons/md"
import s3 from "../../../utils/aws_s3"
import {useSelector, useDispatch} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {setOpenDropdownId} from "../../../store/dropDownSlice";
import { S3 } from 'aws-sdk';
import {deleteFiles, setFileId} from "../../../store/filesSlice";
import toast from "react-hot-toast";


type DropdownMenuProps = {
    x: number;
    y: number;
    download_link: string,
    file_name: string;
    original_name: string;
    file_id: string;
};
const DropdownMenu: React.FC<DropdownMenuProps> = ({  x, y, download_link, file_name, original_name, file_id }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const appDispatch = useAppDispatch()

    const { openDropdownId } = useSelector(
        (state: RootState) => state.dropDownSlice
    );


    const generateSignedUrl = async (bucket: string, key: string, filename: string) => {
        const params: S3.Types.GetObjectRequest = {
            Bucket: bucket,
            Key: key,
            ResponseContentDisposition: `attachment; filename="${filename}"`,
        };

        try {
            const signedUrl = await s3.getSignedUrlPromise('getObject', params);
            return signedUrl;
        } catch (error) {
            console.error('Error generating signed URL', error);
            return null;
        }
    };



    const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()


        const signedUrl = await generateSignedUrl("cloud-storage-bucket-ilja", file_name, original_name);

        const link = document.createElement('a');

        if (signedUrl){
            link.href = signedUrl;
            link.click();
        }

    }


    const handleDeleteFile = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (file_id){

            toast.promise(
                appDispatch(deleteFiles([file_id])),
                {
                    loading: 'Deleting file...',
                    success: "Congratulations! You have successfully deleted file",
                    error: "Sorry, something went wrong while deleting file!",
                },
                {
                    position: 'top-center',
                }
            );
            dispatch(setFileId([]))

        }else{
            console.log("no file id")

        }

    }

    return (
        <div
            ref={ref}
            className="dropdown-menu"
            style={{
                left: x,
                top: y,
                display: openDropdownId === file_id ? "block" : "none"
            }}
        >
            <div className="dropdown-menu_links">
                <a onClick={handleDeleteFile}>
                    <RiDeleteBin6Line size={20}/>
                    <span>Delete</span>
                </a>

                <a onClick={handleClick} >
                    <MdOutlineDownloadForOffline size={20}/>
                    <span>Download</span>
                </a>

            </div>
        </div>
    );
};

export default DropdownMenu;