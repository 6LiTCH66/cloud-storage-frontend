import React from 'react';
import "./folderCard.scss";
import {FcFile, FcFolder} from "react-icons/fc";
import DropDownMenu from "../FileCard/DropDownMenu/DropDownMenu";
import {TextComponent} from "../FileCard/FileCard";

const FolderCard = () => {
    return (
        <>
            <div className="folder-card">

                <div className="folder-image_container">
                    <div className="folder-image">
                        <FcFolder size={130} color={"#d2d3d8"}/>

                    </div>

                </div>

                <div className="folder-info">
                    <TextComponent text={"my folder 1"}/>
                </div>

                {/*{dropdownCoords && <DropDownMenu file_id={_id?.$oid || ""} x={dropdownCoords.x} y={dropdownCoords.y} file_name={aws_file_name} original_name={file_name} download_link={file_location} />}*/}


            </div>

        </>
    );
}

export default FolderCard;