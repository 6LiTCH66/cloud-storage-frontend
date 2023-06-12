import React, {useEffect, useState} from 'react';
import {FileCard, FolderCard} from "../index";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchDashboard} from "../../store/dashboardSlice";
import {useSelector} from "react-redux";

function DashboardList() {
    const dispatch = useAppDispatch();

    const { dashboardList} = useSelector(
        (state: RootState) => state.dashboardSlice
    );

    useEffect(() => {

        dispatch(fetchDashboard())

    }, [dispatch]);


    return (
        <>
            {dashboardList?.length ? (
                <>
                    {dashboardList?.map((dashboard, index) => {
                        if ("File" in dashboard){
                            return <FileCard file={dashboard.File} key={index}/>
                        }else if ("Folder" in dashboard){
                            return <FolderCard folder={dashboard.Folder} key={index}/>
                        }
                    })}
                </>
            ): (
                <div className="dashboard-layout_empty">
                    <p>Your cloud storage is empty!</p>
                </div>

            )}

        </>
    );
}

export default DashboardList;