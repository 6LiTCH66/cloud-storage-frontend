import {Route, Routes, useRoutes} from "react-router-dom";
import {Dashboard} from "../pages";
import {Authentication} from "../components";
import DashboardList from "../components/Lists/DashboardList";
import React from "react";
import FoldersList from "../components/Lists/FoldersList";
import FilesList from "../components/Lists/FilesList";
import FolderDetailsList from "../components/Lists/FolderDetailsList";


export default () => (
    <Routes>

        <Route path="/" element={<Dashboard/>}>
                <Route
                    path="dashboard"
                    element={<DashboardList />}
                />
                <Route
                    path="dashboard/:folder_id"
                    element={<DashboardList />}
                />

                <Route
                    path="files"
                    element={<FilesList />}
                />

                <Route
                    path="files/:file_type"
                    element={<FilesList />}
                />

                <Route
                    path="folders"
                    element={<FoldersList />}
                />

                <Route
                    path="folders/:folder_id"
                    element={<DashboardList />}
                />
        </Route>

        <Route path="/auth" element={<Authentication/>}/>
        <Route path="*" element={<Authentication/>}/>

    </Routes>
)