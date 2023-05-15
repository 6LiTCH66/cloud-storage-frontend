import React, {FC, useState} from 'react';
import {AiOutlineFileText} from "react-icons/ai"
import {BsFileEarmark, BsFileEarmarkTextFill} from "react-icons/bs"
import "./fileCard.scss"
import {Files, Oid} from "../../types/Files"
import {truncate} from "lodash";
import {delete_file} from "../../http/filesAPI";
import {useDispatch} from "react-redux";
import {setFileId} from "../../store/filesSlice";

export interface FileCardProps{
    file: Files,
}
type DropdownMenuProps = {
    x: number;
    y: number;
};
const DropdownMenu: React.FC<DropdownMenuProps> = ({ x, y }) => {
    return (
        <div
            style={{
                position: 'fixed',
                left: x,
                top: y,
                backgroundColor: '#FFF',
                padding: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
        >
            <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
            </ul>
        </div>
    );
};

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

const FileCard:FC<FileCardProps> = ({file: {file_name, file_location, file_type, _id}}) =>  {
    const [dropdownCoords, setDropdownCoords] = useState<{ x: number; y: number } | null>(null);

    const file_format = file_name.split(".").pop() || ""
    const dispatch = useDispatch();

    const handelClick = (file_id: Oid | undefined) => {

        if (file_id){



            // delete_file(file_id.$oid).then((files) => {
            //     console.log(files)
            // }).catch((err) => {
            //     console.log(err)
            // })
            // console.log(file_id.$oid)

        }

    }

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();

        const { clientX, clientY } = event;
        console.log(clientX)
        console.log(clientY)
        setDropdownCoords({ x: clientX, y: clientY });
    };


    return (
        <div data-id={_id?.$oid} className="file-card" onContextMenu={handleContextMenu}>

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

            {/*{dropdownCoords && <DropdownMenu x={dropdownCoords.x} y={dropdownCoords.y} />}*/}

        </div>
    );
}

export default FileCard;