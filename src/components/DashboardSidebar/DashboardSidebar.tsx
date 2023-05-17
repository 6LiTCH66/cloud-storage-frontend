import React, {useRef} from 'react';
import "./dashboardSidebar.scss"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import {AiOutlineFileText, AiOutlineFileImage} from "react-icons/ai"
import {Button} from "@mui/material";
function DashboardSidebar() {

    const navigate = useNavigate()

    const handleNavigate = (path: string) => {
        navigate(`/dashboard/${path}`)
    }


    return (
        <div className="dashboard-sidebar">

            <ul className="sidebar-buttons">
                <li>
                    {/*<Link to="#files">Files</Link>*/}

                    <button type="button" onClick={() => handleNavigate("file")}>
                        <AiOutlineFileText size={25}/>
                        <span>Files</span>
                    </button>
                </li>

                <li>
                    <button type="button" onClick={() => handleNavigate("image")}>
                        <AiOutlineFileImage size={25}/>
                        <span>Photos</span>
                    </button>
                    {/*<Link to="#photos">Photos</Link>*/}
                </li>
            </ul>

        </div>
    );
}

export default DashboardSidebar;