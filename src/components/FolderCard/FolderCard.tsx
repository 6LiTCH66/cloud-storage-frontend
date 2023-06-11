import React, {FC} from 'react';
import "./folderCard.scss";
import {FcFile, FcFolder} from "react-icons/fc";
import DropDownMenu from "../FileCard/DropDownMenu/DropDownMenu";
import {TextComponent} from "../FileCard/FileCard";
import {Folder} from "../../types/Folder";

export interface FolderCardProps{
    folder: Folder,
}

const FolderCard:FC<FolderCardProps> = ({folder}) => {

    return (
        <div data-id={folder._id?.$oid} className="folder-card" onDoubleClick={() => console.log(folder)}>

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