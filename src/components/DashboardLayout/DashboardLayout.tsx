import React, {useEffect, useRef, useState} from 'react';
import {FileCard, DashboardSidebar} from "../index";
import "./dashboardLayout.scss"
import {Files} from "../../types/Files"
import {getFiles} from "../../http/filesAPI";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchFiles, setFileId} from "../../store/filesSlice";
import {useSelector} from "react-redux";
import Selecto from "react-selecto";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {getUser} from "../../store/userSlice";
import {useNavigate, useParams} from "react-router-dom";
import {setOpenDropdownId} from "../../store/dropDownSlice";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function DashboardLayout() {

    const [fileIds, setFileIds] = useState<string[]>([]);
    const navigate = useNavigate();
    const params = useParams()

    const dispatch = useAppDispatch()

    const { files, status, isLoading, file_progress } = useSelector(
        (state: RootState) => state.filesSlice
    );

    const { isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );




    useEffect(() => {
        dispatch(setFileId(fileIds))

    }, [fileIds]);

    useEffect(() => {



        dispatch(getUser())

        if (!isAuth){
            navigate("/auth")
        }

    }, []);


    useEffect(() => {

        dispatch(fetchFiles(params.file_type))

    }, [dispatch, params]);

    const containerRef = useRef<HTMLDivElement>(null);

    const onFileSelect = (id: string, type: "select"| "unselect") =>{

        if (type === "select"){
            setFileIds(prevState => [...prevState, id])
        }else{
            setFileIds(prevState => prevState.filter((_id) => _id !== id))
        }
    }



    return (
        <div>
            <DashboardSidebar/>



            <div className="p-4 sm:ml-64 h-screen flex flex-col">
                <DashboardHeader/>

                {/*<nav className="flexmb-4 px-5 py-3 mb-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">*/}
                {/*    <ol className="flex justify-between items-center space-x-1 md:space-x-3">*/}

                {/*        <li className="inline-flex items-center">*/}

                {/*            <button type="button"*/}
                {/*                    className="inline-flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">*/}

                {/*                <svg fill="none" className="w-9 h-9" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">*/}
                {/*                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>*/}
                {/*                </svg>*/}

                {/*                Upload a file*/}
                {/*            </button>*/}

                {/*        </li>*/}
                {/*        <li className="inline-flex items-center">*/}
                {/*            <button type="button"*/}
                {/*                    className="gap-1 inline-flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm rounded-lg px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">*/}

                {/*                <svg fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">*/}
                {/*                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>*/}
                {/*                </svg>*/}

                {/*                Delete*/}
                {/*            </button>*/}
                {/*        </li>*/}

                {/*    </ol>*/}
                {/*</nav>*/}

                <div className="flexmb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">

                    {files.length ? (
                        <div className="dashboard-layout_wrapper" ref={containerRef} onClick={() => dispatch(setOpenDropdownId(null))}>
                            {files?.map((file, index) => (
                                <FileCard file={file} key={index}/>
                            ))}


                            <Selecto
                                container={containerRef.current}
                                selectableTargets={[".file-card"]}
                                selectByClick={true}
                                selectFromInside={true}
                                hitRate={10}
                                toggleContinueSelect={"shift"}
                                continueSelect={false}
                                onSelect={e => {
                                    e.added.forEach(el => {
                                        el.classList.add("selected");

                                        if (el.dataset["id"]){
                                            onFileSelect(el.dataset["id"], "select")


                                        }

                                    });
                                    e.removed.forEach(el => {
                                        el.classList.remove("selected");
                                        if (el.dataset["id"]){
                                            onFileSelect(el.dataset["id"], "unselect")

                                        }
                                    });
                                }}

                            />

                        </div>


                    ):(
                        <div className="dashboard-layout_empty">
                            <p>Your cloud storage is empty!</p>
                        </div>
                    )}

                </div>



            </div>
        </div>
        // <div className="dashboard-layout">
        //
        //     <DashboardHeader/>
        //     {file_progress ? (
        //         <LinearProgressWithLabel value={file_progress}/>
        //
        //     ):(
        //         <></>
        //     )}
        //
        //     <div className="dashboard-layout_files">
        //         <DashboardSidebar/>
        //
        //
        //             {files.length ? (
        //                     <div className="dashboard-layout_wrapper" ref={containerRef} onClick={() => dispatch(setOpenDropdownId(null))}>
        //                         {files?.map((file, index) => (
        //                             <FileCard file={file} key={index}/>
        //                         ))}
        //
        //
        //                         <Selecto
        //                             container={containerRef.current}
        //                             selectableTargets={[".file-card"]}
        //                             selectByClick={true}
        //                             selectFromInside={true}
        //                             hitRate={10}
        //                             toggleContinueSelect={"shift"}
        //                             continueSelect={false}
        //                             onSelect={e => {
        //                                 e.added.forEach(el => {
        //                                     el.classList.add("selected");
        //
        //                                     if (el.dataset["id"]){
        //                                         onFileSelect(el.dataset["id"], "select")
        //
        //
        //                                     }
        //
        //                                 });
        //                                 e.removed.forEach(el => {
        //                                     el.classList.remove("selected");
        //                                     if (el.dataset["id"]){
        //                                         onFileSelect(el.dataset["id"], "unselect")
        //
        //                                     }
        //                                 });
        //                             }}
        //
        //                         />
        //
        //                     </div>
        //
        //
        //             ):(
        //                 <div className="dashboard-layout_empty">
        //                     <p>Your cloud storage is empty!</p>
        //                 </div>
        //             )}
        //
        //
        //     </div>
        //
        //
        // </div>
    );
}

export default DashboardLayout;