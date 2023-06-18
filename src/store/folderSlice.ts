import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileOrFolder, Folder} from "../types/Folder";
import {FolderJSON} from "../types/FolderJSON";
import {get_folders, upload_folder} from "../http/folderAPI";
import {fetchDashboard} from "./dashboardSlice";

interface FolderSlice {
    folders: Folder[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    folder_id: string[],
}

const FolderStateDefault: FolderSlice = {
    folders: [] as Folder[],
    status: "idle",
    folder_id: []
}

export const addFolder = createAsyncThunk('folderSlice/addFolder', async (uploadFolder: FolderJSON, thunkAPI) => {
    const response =  await upload_folder(uploadFolder);

    thunkAPI.dispatch(fetchDashboard())
    return response;
});

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
    },

    extraReducers: (builder) => {
        builder

            .addCase(addFolder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFolder.fulfilled, (state, action: PayloadAction<Folder[]>) => {
                state.status = 'succeeded';
                state.folders = action.payload
            })
            .addCase(addFolder.rejected, (state, action) => {
                state.status = 'failed';
            })

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
export const { setFolderId } = folderSlice.actions;
export default folderSlice.reducer