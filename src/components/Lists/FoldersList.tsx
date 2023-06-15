import React, {useEffect} from 'react';
import {FileCard, FolderCard} from "../index";

import {useQuery} from "react-query";
import {get_folders} from "../../http/folderAPI";

function FoldersList() {

    const { data: foldersList, status: folder_status } = useQuery(['folders'], get_folders);

    return (
        <>
            {foldersList?.map((folder, index) => (
                <FolderCard folder={folder} key={index}/>
            ))}
        </>
    );
}

export default FoldersList;