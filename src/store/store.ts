import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import filesReducer from "./filesSlice"
import userReducer from "./userSlice"

const store = configureStore({
    reducer: {
        filesSlice: filesReducer,
        userSlice: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;