import React, {useEffect, useState} from 'react';
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {Files} from "../../types/Files";
import {useParams} from "react-router-dom";
import {fetchFiles} from "../../store/filesSlice";
import {FileCard} from "../index";
import {useQuery} from "react-query";
import {get_folders} from "../../http/folderAPI";
import {getFiles} from "../../http/filesAPI";


function FilesList() {
    const { data: filesList, status: folder_status } = useQuery(['files'], getFiles);

    const [sortedFiles, setSortedFiles] = useState<Files[]>();
    const params = useParams()


    useEffect(() => {

        if (params.hasOwnProperty("file_type")){
            if (filesList){
                const filteredFiles = filesList.filter(file => file.file_type === params.file_type)
                setSortedFiles(filteredFiles)
            }


        }else{
            setSortedFiles(filesList)
        }


    }, [params, filesList])

    return (
        <>
            {sortedFiles?.map((file, index) => (
                <FileCard file={file} key={file._id?.$oid}/>
            ))}
        </>
    );
}

export default FilesList;