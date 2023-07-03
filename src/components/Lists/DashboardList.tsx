import React, {FC, useEffect, useMemo, useState} from 'react';
import {FileCard, FolderCard} from "../index";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchDashboard} from "../../store/dashboardSlice";
import {useDispatch, useSelector} from "react-redux";
import {useQuery, useQueryClient} from "react-query";
import {dashboard, get_folder_details, get_folders} from "../../http/folderAPI";
import {useParams, useLocation} from "react-router-dom";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

import {FcOpenedFolder} from "react-icons/fc"
import {useFolders} from "../../hooks/useFolders";
import {setFileId} from "../../store/filesSlice";
import {FileOrFolder, Folder} from "../../types/Folder";
import {setCurrentFolder} from "../../store/folderSlice";


interface DashboardDetailsProps {
    detailsList: FileOrFolder[];
}

const DashboardDetails:FC<DashboardDetailsProps> = React.memo(({ detailsList }) => {

    return (
        <>
            {detailsList?.map((dashboard, index) => {
                if ("File" in dashboard){
                    return <FileCard file={dashboard.File} key={dashboard.File._id?.$oid}/>
                }else if ("Folder" in dashboard){
                    return <FolderCard folder={dashboard.Folder} key={dashboard.Folder._id?.$oid}/>
                }
            })}
        </>
    )
});



const DashboardList = () => {
    const dispatch = useAppDispatch()
    const params = useParams();
    const { data: detailsList, status } = useFolders(params.folder_id)

    const { data: currentFolder, status: currentFolderStatus } =
        useQuery(['currentFolder', params.folder_id], () => get_folder_details(params.folder_id), {enabled: !!params.folder_id});

    useEffect(() => {
        if (currentFolder){

            // console.log(currentFolder.path)
            dispatch(setCurrentFolder(currentFolder))
        }

    }, [currentFolder])

    useEffect(() => {
        if (!params.folder_id){
            dispatch(setCurrentFolder({} as Folder))
        }
    }, [params])


    return (
        <>
            {status === "success" || detailsList?.length ? (
                <>
                    {detailsList?.length ? (
                        <DashboardDetails detailsList={detailsList}/>

                    ):(
                        <div className="empty_folder">
                            <FcOpenedFolder size={200}/>
                            <span>Folder is empty</span>

                        </div>
                    )}

                </>
            ): (

                <>
                    {Array(21).fill(0).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </>

            )}

        </>
    );
}

export default DashboardList;