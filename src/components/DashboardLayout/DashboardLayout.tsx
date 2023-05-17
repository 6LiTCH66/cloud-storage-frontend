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
        <div className="dashboard-layout">

            <DashboardHeader/>
            {file_progress ? (
                <LinearProgressWithLabel value={file_progress}/>

            ):(
                <></>
            )}

            <div className="dashboard-layout_files">
                <DashboardSidebar/>


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
    );
}

export default DashboardLayout;