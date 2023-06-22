import React, {FC, ReactNode, useEffect, useRef, useState, useContext} from 'react';
import "./dashboardLayout.scss"
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchFiles, setFileId} from "../../store/filesSlice";
import {setFolderId} from "../../store/folderSlice";
import {useSelector} from "react-redux";
import Selecto from "react-selecto";
import {getUser, userLogout} from "../../store/userSlice";
import {useNavigate, useParams} from "react-router-dom";
import {setOpenDropdownId} from "../../store/dropDownSlice";
export interface DashboardProps{
    children: ReactNode
}

const DashboardLayout:FC<DashboardProps> = ({children}) => {
    const [fileIds, setFileIds] = useState<string[]>([]);
    const [folderIds, setFolderIds] = useState<string[]>([]);

    const params = useParams();

    // const { data: detailsList, status: folder_status } = useQuery(['folderDetails', params.folder_id], () => dashboard(params.folder_id));

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const { isAuth, status } = useSelector(
        (state: RootState) => state.userSlice
    );

    const { file_id } = useSelector(
        (state: RootState) => state.filesSlice
    );

    const { folder_id } = useSelector(
        (state: RootState) => state.folderSlice
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const selectoRef = useRef<Selecto>(null);


    useEffect(() => {

        dispatch(getUser())


    }, []);


    useEffect(() => {
        if (status === "succeeded"){

            if (!isAuth){
                navigate("/auth")
            }

        }else if (status === "failed"){
            navigate("/auth")
        }

    }, [isAuth]);


    useEffect(() => {

        if (fileIds.length){

            dispatch(setFileId(fileIds))

        }else{

            dispatch(setFileId([]))
        }

    }, [fileIds]);


    useEffect(() => {

        if (folderIds.length){

            dispatch(setFolderId(folderIds))

        }else{

            dispatch(setFolderId([]))
        }

    }, [folderIds]);



    useEffect(() => {
        setFileIds([])
        setFolderIds([])

    }, [params])




    const onItemSelect = (id: string, type: "select"| "unselect", itemType: "file" | "folder" | string) =>{
        switch (itemType){
            case "file":
                if (type === "select"){
                    setFileIds(prevState => [...prevState, id])
                }else{
                    if (file_id.length){
                        setFileIds(prevState => prevState.filter((_id) => _id !== id))

                    }
                }
                break;
            case "folder":
                if (type === "select"){
                    setFolderIds(prevState => [...prevState, id])
                }else{
                    if (folder_id.length){
                        setFolderIds(prevState => prevState.filter((_id) => _id !== id))
                    }
                }
                break;
        }


    }



    return (
        <div className="dashboard-layout_main p-4 sm:ml-64 flex flex-col">
            <DashboardHeader/>

            <div className="dashboard-layout_container flexmb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">

                <div className="dashboard-layout_wrapper" ref={containerRef} onClick={() => dispatch(setOpenDropdownId(null))}>

                    {children}

                    <Selecto
                        ref={selectoRef}
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

                                if (el.dataset["id"] && el.dataset["tag"]){
                                    onItemSelect(el.dataset["id"], "select", el.dataset["tag"])
                                }


                            });
                            e.removed.forEach(el => {
                                el.classList.remove("selected");

                                if (el.dataset["id"] && el.dataset["tag"]){
                                    onItemSelect(el.dataset["id"], "unselect", el.dataset["tag"])
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