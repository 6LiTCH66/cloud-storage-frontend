import React, {FC, ReactNode, useEffect} from 'react';
import {DashboardLayout, DashboardSidebar} from "../../components";
import { Outlet } from 'react-router-dom';
import "./dashboard.scss"

import {DashboardProps} from "../../components/DashboardLayout/DashboardLayout";

const Dashboard = () => {

    return (

        <div className="dashboard">

            <DashboardSidebar/>

            <DashboardLayout>
                <Outlet/>
            </DashboardLayout>

        </div>
    );
}

export default Dashboard;