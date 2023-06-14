import React, {useEffect, useState} from 'react';
import {FileCard, FolderCard} from "../index";
import {dashboard} from "../../http/folderAPI";
import {useParams} from "react-router-dom";
import {FileOrFolder} from "../../types/Folder";
import { useQueryClient, useQuery } from 'react-query';
import SkeletonCard from "../SkeletonCard/SkeletonCard";

function FolderDetailsList() {
    const params = useParams();

    const { data: detailsList, status } = useQuery(['folderDetails', params.folder_id], () => dashboard(params.folder_id));


    return (
        <>
            {detailsList?.map((dashboard, index) => {
                if ("File" in dashboard){
                    return <FileCard file={dashboard.File} key={index}/>
                }else if ("Folder" in dashboard){
                    return <FolderCard folder={dashboard.Folder} key={index}/>
                }
            })}
        </>
    );
}

export default FolderDetailsList;