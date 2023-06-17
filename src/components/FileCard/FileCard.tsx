import React, {FC, useEffect, useState} from 'react';
import {AiOutlineFileText} from "react-icons/ai"
import {BsFileEarmark, BsFileEarmarkTextFill} from "react-icons/bs"
import "./fileCard.scss"
import {Files, Oid} from "../../types/Files"
import {FcFile} from "react-icons/fc";
import {useDispatch, useSelector} from "react-redux";

import DropDownMenu from "./DropDownMenu/DropDownMenu";
import {setOpenDropdownId} from "../../store/dropDownSlice";

export interface FileCardProps{
    file: Files,
}



export const TextComponent:FC<{text: string}> = ({text}) => {
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
    const [openModal, setOpenModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const file_format = file_name.split(".").pop() || ""
    const dispatch = useDispatch();



    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(setOpenDropdownId(_id?.$oid))

        const { clientX, clientY } = event;
        setDropdownCoords({ x: clientX, y: clientY });
    };
    const handleDoubleClick = () => {

        if (file_type === "image"){

            setSelectedImage(file_location)
            setOpenModal(true)
        }
    }


    return (
        <>
            <div data-id={_id?.$oid} data-tag={"file"} className="file-card" onContextMenu={handleContextMenu} onDoubleClick={handleDoubleClick}>

                <div className="file-image_container">
                    <div className="file-image">
                        {file_type === "image" ? (
                            <img className="image" src={file_location} alt="File"/>

                        ): (
                            <FcFile size={130} color={"#d2d3d8"}/>

                        )}


                        <div className="file-format">
                            <strong>{file_format.toUpperCase()}</strong>
                        </div>
                    </div>

                </div>

                <div className="file-info">
                    <TextComponent text={file_name}/>
                </div>

                {dropdownCoords && <DropDownMenu file_id={_id?.$oid || ""} x={dropdownCoords.x} y={dropdownCoords.y} file_name={aws_file_name} original_name={file_name} download_link={file_location} />}


            </div>

            <div id="myModal" className="modal" style={{display: openModal ? "block" : "none"}} onClick={() => setOpenModal(false)}>
                <span className="close" onClick={() => setOpenModal( false)}>×</span>

                <img src={selectedImage ? selectedImage : ""} alt="modal image" className="modalContent"/>

            </div>
        </>
    );
}

export default FileCard;