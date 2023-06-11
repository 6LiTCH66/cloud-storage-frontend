import React, {ReactNode, useEffect} from 'react';
import {DashboardLayout, DashboardSidebar} from "../../components";
import "./dashboard.scss"
import {useLocation, useNavigate} from "react-router-dom";
import DashboardList from "../../components/Lists/DashboardList";
import FilesList from "../../components/Lists/FilesList";
import FoldersList from "../../components/Lists/FoldersList";

function Dashboard() {
    const location = useLocation();
    const history = useNavigate();


    const checkPathName = (): ReactNode | null => {
        switch (location.pathname){
            case "/dashboard":
                return <DashboardList/>
            case "/files":
                return <FilesList/>
            case "/folders":
                return <FoldersList/>
            default:
                history("/dashboard")
                return null
        }
    }


    return (

        <div className="dashboard">

            <DashboardSidebar/>

            <DashboardLayout children={checkPathName()}/>

        </div>
    );
}

export default Dashboard;