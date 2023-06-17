import React, {useEffect, useState} from 'react';
import {FileCard, FolderCard} from "../index";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchDashboard} from "../../store/dashboardSlice";
import {useDispatch, useSelector} from "react-redux";
import {useQuery, useQueryClient} from "react-query";
import {dashboard} from "../../http/folderAPI";
import {useParams} from "react-router-dom";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

import {FcOpenedFolder} from "react-icons/fc"
import {useFolders} from "../../hooks/useFolders";
import {setFileId} from "../../store/filesSlice";

function DashboardList() {
    const params = useParams();
    const defaultDispatch = useDispatch()
    const { data: detailsList, status } = useFolders(params.folder_id)


    return (
        <>
            {status === "success" || detailsList?.length ? (
                <>
                    {detailsList?.length ? (
                        <>
                            {detailsList?.map((dashboard, index) => {
                                if ("File" in dashboard){
                                    return <FileCard file={dashboard.File} key={index}/>
                                }else if ("Folder" in dashboard){
                                    return <FolderCard folder={dashboard.Folder} key={index}/>
                                }
                            })}
                        </>
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