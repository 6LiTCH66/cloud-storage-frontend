import React, {useEffect, useRef, useState} from 'react';
import "./dashboardSidebar.scss"
import {AiOutlineCloud, AiOutlineCloudUpload} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import {AiOutlineFileText, AiOutlineFileImage} from "react-icons/ai"
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses }  from '@mui/material/LinearProgress';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
function DashboardSidebar() {

    function convertMBtoGBPercentage(mb: number) {
        const gb = mb / 1024;
        return (gb / 1) * 100;
    }

    const navigate = useNavigate()
    const [space, setSpace] = useState<number>(0)

    const { files } = useSelector(
        (state: RootState) => state.filesSlice
    );
    useEffect(() => {
        let files_size = files.reduce((accumulator, currentValue) => accumulator + currentValue.size, 0);
        // console.log(files_size / (1024 * 1024 * 1024))
        setSpace(Math.round(files_size / (1024 * 1024) * Math.pow(10, 2)) / Math.pow(10, 2))
    }, [files]);





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

            <div className="space-container">
                <div className="space_info">
                    <AiOutlineCloud size={30}/>
                    <p>Storage</p>

                </div>
                <p className="space-limit">
                    {space} MB of 1 GB
                </p>
                <Box sx={{ width: '100%' }}>
                    <BorderLinearProgress variant="determinate" value={convertMBtoGBPercentage(space)} />
                </Box>
            </div>

        </div>
    );
}

export default DashboardSidebar;