import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages";
import {Authentication} from "../components";


export default () => (
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>}>
            <Route path=":file_type" element={<Dashboard/>}/>
        </Route>

        <Route path="/auth" element={<Authentication/>}/>
        <Route path="*" element={<Authentication/>}/>

    </Routes>
)