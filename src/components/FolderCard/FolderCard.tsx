import React, {createRef, FC, useContext, useEffect, useRef} from 'react';
import "./folderCard.scss";
import {FcFile, FcFolder} from "react-icons/fc";
import DropDownMenu from "../FileCard/DropDownMenu/DropDownMenu";
import {TextComponent} from "../FileCard/FileCard";
import {Folder} from "../../types/Folder";
import {useNavigate, useLocation} from "react-router-dom";
import {fetchDashboard} from "../../store/dashboardSlice";
import {useAppDispatch} from "../../store/store";
import { useQueryClient, useQuery } from 'react-query';
import {dashboard} from "../../http/folderAPI";
import {setFileId} from "../../store/filesSlice";
import {useDispatch} from "react-redux";
export interface FolderCardProps{
    folder: Folder,
}

const FolderCard:FC<FolderCardProps> = ({folder}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const current_path = location.pathname.split("/")[1];

    const openFolder = () => {
        navigate(`/${current_path}/${folder._id.$oid}`)

    }


    const getFolderId = (folder_id: string) => {

        if (!queryClient.getQueryData(['folderDetails', folder_id])) {

            queryClient.prefetchQuery(['folderDetails', folder_id], () => dashboard(folder_id));
        }

    }



    return (
        <div data-id={folder._id?.$oid} data-tag={"folder"} onMouseEnter={() => getFolderId(folder._id?.$oid)} onTouchStart={() => getFolderId(folder._id?.$oid)} className="folder-card" onDoubleClick={openFolder}>

            <div className="folder-image_container">
                <div className="folder-image">
                    <FcFolder size={130} color={"#d2d3d8"}/>
                </div>

            </div>

            <div className="folder-info">
                <TextComponent text={folder.folder_name}/>
            </div>

            {/*{dropdownCoords && <DropDownMenu file_id={_id?.$oid || ""} x={dropdownCoords.x} y={dropdownCoords.y} file_name={aws_file_name} original_name={file_name} download_link={file_location} />}*/}


        </div>

    );
}

export default  React.memo(FolderCard);