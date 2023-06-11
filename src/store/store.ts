import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import filesReducer from "./filesSlice"
import userReducer from "./userSlice"
import dropdownReducer from "./dropDownSlice"
import dashboardReducer from "./dashboardSlice"
import folderReducer from "./folderSlice"

const store = configureStore({
    reducer: {
        filesSlice: filesReducer,
        userSlice: userReducer,
        dropDownSlice: dropdownReducer,
        dashboardSlice: dashboardReducer,
        folderSlice: folderReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;