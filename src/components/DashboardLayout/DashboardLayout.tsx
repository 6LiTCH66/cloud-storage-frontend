import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {FileCard, DashboardSidebar, FolderCard} from "../index";
import "./dashboardLayout.scss"
import {Files} from "../../types/Files"
import {getFiles} from "../../http/filesAPI";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchFiles, setFileId} from "../../store/filesSlice";
import {useSelector} from "react-redux";
import Selecto from "react-selecto";
import {getUser, userLogout} from "../../store/userSlice";
import {useNavigate, useParams} from "react-router-dom";
import {setOpenDropdownId} from "../../store/dropDownSlice";
import {useQuery} from "react-query";
import {dashboard} from "../../http/folderAPI";

export interface DashboardProps{
    children: ReactNode
}

const DashboardLayout:FC<DashboardProps> = ({children}) => {
    const [fileIds, setFileIds] = useState<string[]>([]);

    const params = useParams();

    const { data: detailsList, status: folder_status } = useQuery(['folderDetails', params.folder_id], () => dashboard(params.folder_id));

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const { isAuth, status } = useSelector(
        (state: RootState) => state.userSlice
    );

    useEffect(() => {
        dispatch(setFileId(fileIds))

    }, [fileIds]);

    useEffect(() => {

        dispatch(getUser())


    }, []);


    useEffect(() => {
        if (status === "succeeded"){
            if (!isAuth){
                navigate("/auth")
            }

        }

    }, [isAuth]);



    const containerRef = useRef<HTMLDivElement>(null);

    const onFileSelect = (id: string, type: "select"| "unselect") =>{

        if (type === "select"){
            setFileIds(prevState => [...prevState, id])
        }else{
            setFileIds(prevState => prevState.filter((_id) => _id !== id))
        }
    }


    return (
        <div className="dashboard-layout_main p-4 sm:ml-64 flex flex-col">
            <DashboardHeader/>

            <div className="dashboard-layout_container flexmb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">

                <div className="dashboard-layout_wrapper" ref={containerRef} onClick={() => dispatch(setOpenDropdownId(null))}>

                    {children}

                    <Selecto
                        container={containerRef.current}
                        selectableTargets={[".file-card", ".folder-card"]}
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


            </div>

        </div>
    );
}

export default DashboardLayout;