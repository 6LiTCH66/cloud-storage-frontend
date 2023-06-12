import React, {useEffect, useState} from 'react';
import {FileCard, FolderCard} from "../index";
import {dashboard} from "../../http/folderAPI";
import {useParams} from "react-router-dom";
import {FileOrFolder} from "../../types/Folder";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

function FolderDetailsList() {

    const params = useParams();

    const [detailsList, setDetailsList] = useState<FileOrFolder[]>();

    useEffect(() => {

        dashboard(params.folder_id).then((dashboard) => {
            setDetailsList(dashboard)

        }).catch((err) => {
            console.log(err)
        })
    }, [params]);


    return (
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
            ): (
                <>
                    {Array(10).fill(0).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </>

            )}

        </>
    );
}

export default FolderDetailsList;