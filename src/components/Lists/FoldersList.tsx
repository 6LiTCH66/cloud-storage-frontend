import React, {useEffect} from 'react';
import {FileCard, FolderCard} from "../index";

import {useQuery, useQueryClient} from "react-query";
import {dashboard, get_folders} from "../../http/folderAPI";

function FoldersList() {
    const queryClient = useQueryClient();
    const { data: foldersList, status: folder_status } =
        useQuery(
            ['folders'],
            get_folders,
            {
                onSuccess: (data) => {
                    data.forEach((subfolder) => {
                        queryClient.prefetchQuery(["folderDetails", subfolder._id.$oid], () => dashboard(subfolder._id.$oid))

                    })
                }});

    return (
        <>
            {foldersList?.map((folder, index) => (
                <FolderCard folder={folder} key={folder._id.$oid}/>
            ))}
        </>
    );
}

export default FoldersList;