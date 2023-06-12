import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileOrFolder} from "../types/Folder";
import {dashboard} from "../http/folderAPI";

interface DashboardSlice {
    dashboardList: FileOrFolder[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const DashboardStateDefault: DashboardSlice = {
    dashboardList: [] as FileOrFolder[],
    status: "idle",
}
export const fetchDashboard = createAsyncThunk('dashboardSlice/fetchDashboard', async () => {
    return await dashboard(undefined);
});


const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState: DashboardStateDefault,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDashboard.fulfilled, (state, action: PayloadAction<FileOrFolder[]>) => {
                state.status = 'succeeded';
                state.dashboardList = action.payload
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.status = 'failed';
            })

    }
})

export default dashboardSlice.reducer