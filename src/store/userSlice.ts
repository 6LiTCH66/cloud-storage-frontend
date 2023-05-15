import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserAuthentication} from "../types/UserAuthentication";
import {delete_file, getFiles} from "../http/filesAPI";
import {get_user, login, logout} from "../http/userAPI";
import {Files} from "../types/Files";
import {fetchFiles} from "./filesSlice";

interface UserState{
    currentUser: UserAuthentication,
    isAuth: boolean,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const defaultState: UserState = {
    currentUser: {} as UserAuthentication,
    isAuth: false,
    status: "idle"
};

export const userLogin = createAsyncThunk('userSlice/userLogin', async (userCredentials: UserAuthentication) => {
    return await login(userCredentials);
});

export const userLogout = createAsyncThunk('userSlice/userLogout', async () => {
    return await logout();
});

export const getUser = createAsyncThunk('userSlice/getUser', async () => {
    return await get_user();
});


const userSlice = createSlice({
    name: "userSlice",
    initialState: defaultState,

    reducers: {
        setUser: (state, action: PayloadAction<UserAuthentication>) =>{
            state.currentUser = action.payload;
            state.isAuth = localStorage.getItem("user") ? true : false;
        },

        signout: (state) => {
            localStorage.removeItem("user")
            state.currentUser = {} as UserAuthentication;
            state.isAuth = false;
        },

        checkAuth: (state) => {
            state.isAuth = localStorage.getItem("user") ? true : false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogin.fulfilled, (state, action: PayloadAction<UserAuthentication>) => {
                state.status = 'succeeded';
                state.currentUser = action.payload
                state.isAuth = true;

            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false;
            })


            .addCase(userLogout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.currentUser = {} as UserAuthentication
                state.isAuth = false

            })
            .addCase(userLogout.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false
            })


            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<UserAuthentication>) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
                state.isAuth = true;

            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.currentUser = { } as UserAuthentication
                state.isAuth = false;
            })
    }
})

export const { setUser, signout, checkAuth } = userSlice.actions;
export default userSlice.reducer;