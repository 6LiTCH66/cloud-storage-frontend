import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages";
import {Authentication} from "../components";


export default () => (
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>

        <Route path="/files" element={<Dashboard/>}/>
        <Route path="/folders" element={<Dashboard/>}/>


        <Route path="/auth" element={<Authentication/>}/>
        <Route path="*" element={<Authentication/>}/>

    </Routes>
)