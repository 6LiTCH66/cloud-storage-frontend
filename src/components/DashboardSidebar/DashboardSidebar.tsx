import React, {useEffect, useRef, useState} from 'react';
import "./dashboardSidebar.scss"
import {AiOutlineCloud, AiOutlineCloudUpload} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import {AiOutlineFileText, AiOutlineFileImage} from "react-icons/ai"
import { styled } from '@mui/material/styles';
import {Sidebar} from "flowbite-react";

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

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



    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node)
          ) {
            setIsSidebarOpen(false);
          }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);


    return (
        <div>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar" type="button" onClick={toggleSidebar}
                    className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar"
                   className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                       isSidebarOpen ? '' : '-translate-x-full'
                   } sm:translate-x-0`}
                   aria-label="Sidebar"
                   ref={sidebarRef}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">

                    <div className="flex items-center pl-2.5 mb-5">

                        <div className="logo" >
                            <AiOutlineCloud size={35} />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Cloud Storage</span>
                        </div>
                    </div>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>


                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                                <svg fill="none" className="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Folders</span>
                            </a>
                        </li>

                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">


                                <svg fill="none" className="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                                </svg>

                                <span className="flex-1 ml-3 whitespace-nowrap">Files</span>
                            </a>
                        </li>

                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                                <svg fill="currentColor"
                                     className="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg"
                                     aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                                </svg>

                                <span className="flex-1 ml-3 whitespace-nowrap">Photos</span>
                            </a>
                        </li>

                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                                <svg fill="none" className="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
                                </svg>

                                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                            </a>
                        </li>

                    </ul>

                    <div className="space-container mt-auto">
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
            </aside>



        </div>
        // <div className="dashboard-sidebar">
        //
        //     <ul className="sidebar-buttons">
        //         <li>
        //             {/*<Link to="#files">Files</Link>*/}
        //
        //             <button type="button" onClick={() => handleNavigate("file")}>
        //                 <AiOutlineFileText size={25}/>
        //                 <span>Files</span>
        //             </button>
        //         </li>
        //
        //         <li>
        //             <button type="button" onClick={() => handleNavigate("image")}>
        //                 <AiOutlineFileImage size={25}/>
        //                 <span>Photos</span>
        //             </button>
        //             {/*<Link to="#photos">Photos</Link>*/}
        //         </li>
        //     </ul>
        //
        //     <div className="space-container">
        //         <div className="space_info">
        //             <AiOutlineCloud size={30}/>
        //             <p>Storage</p>
        //
        //         </div>
        //         <p className="space-limit">
        //             {space} MB of 1 GB
        //         </p>
        //         <Box sx={{ width: '100%' }}>
        //             <BorderLinearProgress variant="determinate" value={convertMBtoGBPercentage(space)} />
        //         </Box>
        //     </div>
        //
        // </div>
    );
}

export default DashboardSidebar;