import axios, {AxiosRequestConfig} from "axios"
import {FolderJSON} from "../types/FolderJSON";
import {FileOrFolder, Folder} from "../types/Folder";

export const delete_folder = async (ids: string[]) :Promise<Folder[]> => {

    const queryParams = ids.map(id => `ids=${id}`).join('&');

    try{
        const file = await axios.delete<Folder[]>(`${process.env.REACT_APP_BASE_URL}/folder/delete?${queryParams}`, {withCredentials: true})
        return file.data

    }catch (error){
        console.error(error)
        throw error
    }
}


export const upload_folder = async ({ uploadFolder, folder_id }: { uploadFolder: FolderJSON, folder_id: string | undefined }):Promise<Folder[]> => {

    try{
        const file = await axios.post<Folder[]>(`${process.env.REACT_APP_BASE_URL}/folder/create`,
            uploadFolder,
            {withCredentials: true,
                params: {
                    folder_id: folder_id
                }
            }
        )
        return file.data

    }catch (error){
        console.error(error)
        throw error
    }
}

export const get_folders = async ():Promise<Folder[]> => {
    try{
        const folders = await axios.get<Folder[]>(`${process.env.REACT_APP_BASE_URL}/folder/folders`, {withCredentials: true})
        return folders.data

    }catch (error){
        console.error(error)
        throw error
    }
}

export const get_folder_details = async (folder_id: string | undefined):Promise<Folder> => {
    try{
        const folders = await axios.get<Folder>(`${process.env.REACT_APP_BASE_URL}/folder/details`,
            {withCredentials: true,
                params: {
                    folder_id: folder_id
                }})
        return folders.data

    }catch (error){
        console.error(error)
        throw error
    }
}


export const dashboard = async (id: string | undefined) => {

    const config: AxiosRequestConfig = {
        params: {
            folder_id: id
        }
    };

    try{
        const file = await axios.get<FileOrFolder[]>(`${process.env.REACT_APP_BASE_URL}/dashboard`,
            {withCredentials: true,
                params: id ? config: ""
            })
        return file.data

    }catch (error){
        console.error(error)
        throw error
    }
}