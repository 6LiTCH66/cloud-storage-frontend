import React, {useEffect, useState} from 'react';
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {Files} from "../../types/Files";
import {useParams} from "react-router-dom";
import {fetchFiles} from "../../store/filesSlice";
import {FileCard} from "../index";


function FilesList() {
    const [sortedFiles, setSortedFiles] = useState<Files[]>();
    const params = useParams()

    const dispatch = useAppDispatch()

    const { files, status, isLoading, file_progress } = useSelector(
        (state: RootState) => state.filesSlice
    );

    useEffect(() => {

        dispatch(fetchFiles(undefined))


    }, [dispatch, params]);

    useEffect(() => {

        if (params.hasOwnProperty("file_type")){
            const filteredFiles = files.filter(file => file.file_type === params.file_type)
            setSortedFiles(filteredFiles)

        }else{
            setSortedFiles(files)
        }


    }, [params, files])

    return (
        <>
            {sortedFiles?.map((file, index) => (
                <FileCard file={file} key={index}/>
            ))}
        </>
    );
}

export default FilesList;