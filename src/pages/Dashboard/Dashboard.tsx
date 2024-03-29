import React, {FC, ReactNode, useContext, useEffect} from 'react';
import {DashboardLayout, DashboardSidebar} from "../../components";
import { Outlet } from 'react-router-dom';
import "./dashboard.scss"
import {useQueryClient} from "react-query";


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