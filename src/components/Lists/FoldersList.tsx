import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchFiles} from "../../store/filesSlice";
import {getFolder} from "../../store/folderSlice";
import {FileCard, FolderCard} from "../index";

function FoldersList() {

    const dispatch = useAppDispatch()

    const { folders, status} = useSelector(
        (state: RootState) => state.folderSlice
    );

    useEffect(() => {

        dispatch(getFolder())


    }, [dispatch]);

    useEffect(() => {
        console.log(folders)
    }, [folders]);


    return (
        <>
            {folders?.map((folder, index) => (
                <FolderCard folder={folder} key={index}/>
            ))}
        </>
    );
}

export default FoldersList;