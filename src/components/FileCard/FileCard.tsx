import React, {FC, useEffect, useState} from 'react';
import {AiOutlineFileText} from "react-icons/ai"
import {BsFileEarmark, BsFileEarmarkTextFill} from "react-icons/bs"
import "./fileCard.scss"
import {Files, Oid} from "../../types/Files"
import {truncate} from "lodash";
import {delete_file} from "../../http/filesAPI";
import {useDispatch, useSelector} from "react-redux";
import {setFileId} from "../../store/filesSlice";

import DropDownMenu from "./DropDownMenu/DropDownMenu";
import {RootState} from "../../store/store";
import {setOpenDropdownId} from "../../store/dropDownSlice";

export interface FileCardProps{
    file: Files,
}



const TextComponent:FC<{text: string}> = ({text}) => {
    const MAX_LENGTH = 21;
    if (text.length <= MAX_LENGTH) {
        return <span>{text}</span>;
    }

    const firstHalf = text.slice(0, Math.ceil(MAX_LENGTH / 2));
    const secondHalf = text.slice(-Math.floor(MAX_LENGTH / 2));

    return (
        <span>
            {firstHalf}
                {'...'}
            {secondHalf}
        </span>
    );
};

const FileCard:FC<FileCardProps> = ({file: {file_name, file_location, file_type, _id, aws_file_name}}) =>  {
    const [dropdownCoords, setDropdownCoords] = useState<{ x: number; y: number } | null>(null);

    const file_format = file_name.split(".").pop() || ""
    const dispatch = useDispatch();



    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(setOpenDropdownId(_id?.$oid))

        const { clientX, clientY } = event;
        setDropdownCoords({ x: clientX, y: clientY });
    };


    return (
        <div data-id={_id?.$oid} className="file-card" onContextMenu={handleContextMenu} >

            <div className="file-image_container">
                <div className="file-image">
                    {file_type === "image" ? (
                        <img className="image" src={file_location} alt="File"/>

                    ): (
                        <BsFileEarmarkTextFill size={130} color={"#d2d3d8"}/>

                    )}


                    <div className="file-format">
                        <strong>{file_format.toUpperCase()}</strong>
                    </div>
                </div>

            </div>

            <div className="file-info">
                {/*<span>{truncate(file_name, {'length': 22})}</span>*/}
                <TextComponent text={file_name}/>
            </div>

            {dropdownCoords && <DropDownMenu file_id={_id?.$oid || ""} x={dropdownCoords.x} y={dropdownCoords.y} file_name={aws_file_name} original_name={file_name} download_link={file_location} />}

        </div>
    );
}

export default FileCard;