import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileOrFolder, Folder} from "../types/Folder";
import {FolderJSON} from "../types/FolderJSON";
import {get_folders, upload_folder} from "../http/folderAPI";
import {fetchDashboard} from "./dashboardSlice";

interface FolderSlice {
    folders: Folder[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    folder_id: string[],
    current_folder: Folder
}

const FolderStateDefault: FolderSlice = {
    folders: [] as Folder[],
    status: "idle",
    folder_id: [],
    current_folder: {} as Folder
}

export const getFolder = createAsyncThunk('folderSlice/getFolder', async () => {
    return await get_folders();

});


const folderSlice = createSlice({
    name: "folderSlice",
    initialState: FolderStateDefault,
    reducers: {
        setFolderId(state, action: PayloadAction<string[]>){
            state.folder_id = action.payload
        },
        setCurrentFolder(state, action: PayloadAction<Folder>){
            state.current_folder = action.payload
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(getFolder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFolder.fulfilled, (state, action: PayloadAction<Folder[]>) => {
                state.status = 'succeeded';
                state.folders = action.payload
            })
            .addCase(getFolder.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})
export const { setFolderId, setCurrentFolder } = folderSlice.actions;
export default folderSlice.reducer