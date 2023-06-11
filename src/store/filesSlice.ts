import {delete_file, getFiles, upload_file} from "../http/filesAPI";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Files} from "../types/Files"
import {RootState} from "./store";


interface FilesSlice{
    files: Files[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    isLoading: boolean;
    file_id: string[]
    file_progress: number | null,
}

const FilesStateDefault: FilesSlice = {
    files: [] as Files[],
    status: "idle",
    isLoading: true,
    file_id: [],
    file_progress: null
}
export const fetchFiles = createAsyncThunk('filesSlice/fetchFiles', async (file_type: string | undefined) => {
    return await getFiles(file_type);
});

export const deleteFiles = createAsyncThunk('favouriteSlice/deleteReduxFavourites', async (file_ids: string[]) => {
    return await delete_file(file_ids);
});

export const addFiles = createAsyncThunk('filesSlice/addFiles', async (file: Files) => {
    return await upload_file(file);
});

const filesSlice = createSlice({
    name: "filesSlice",
    initialState: FilesStateDefault,

    reducers: {
        setFileId(state, action: PayloadAction<string[]>){
            state.file_id = action.payload
        },

        setFileProgress(state, action: PayloadAction<number | null>){
            state.file_progress = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<Files[]>) => {
                state.status = 'succeeded';
                state.files = action.payload
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.status = 'failed';
            })


            .addCase(addFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFiles.fulfilled, (state, action: PayloadAction<Files[]>) => {
                state.status = 'succeeded';
                state.files = action.payload
            })
            .addCase(addFiles.rejected, (state, action) => {
                state.status = 'failed';
            })


            .addCase(deleteFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFiles.fulfilled, (state, action: PayloadAction<Files[]>) => {
                state.status = 'succeeded';
                state.files = action.payload
            })
            .addCase(deleteFiles.rejected, (state, action) => {
                state.status = 'failed';
            })






    },
})
export const files = (state: RootState) => state.filesSlice.files
export const { setFileId, setFileProgress } = filesSlice.actions;
export default filesSlice.reducer;
