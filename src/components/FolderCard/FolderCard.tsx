import React, {FC, useEffect} from 'react';
import "./folderCard.scss";
import {FcFile, FcFolder} from "react-icons/fc";
import DropDownMenu from "../FileCard/DropDownMenu/DropDownMenu";
import {TextComponent} from "../FileCard/FileCard";
import {Folder} from "../../types/Folder";
import {useNavigate, useLocation} from "react-router-dom";
import {fetchDashboard} from "../../store/dashboardSlice";
import {useAppDispatch} from "../../store/store";
export interface FolderCardProps{
    folder: Folder,
}

const FolderCard:FC<FolderCardProps> = ({folder}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const current_path = location.pathname.split("/")[1];

    const openFolder = () => {
        navigate(`/${current_path}/${folder._id.$oid}`)
    }


    return (
        <div data-id={folder._id?.$oid} className="folder-card" onDoubleClick={openFolder}>

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

export default FolderCard;