import axios, {AxiosRequestConfig} from "axios"
import {Files} from "../types/Files";

export const getFiles = async (file_type: string | undefined):Promise<Files[]> => {

    const config: AxiosRequestConfig = {
        params: {
            file_type: "file"
        }
    };

    try{
        const files = await axios.get<Files[]>(`${process.env.REACT_APP_BASE_URL}/api/files`,
            {withCredentials: true,
                paramsSerializer: (params) => {
                    return `file_type=${file_type}`;
                },
                params: file_type ? config : ""
            })
        return files.data

    }catch (error){
        console.error(error)
        throw error
    }
}


export const upload_file = async (uploadFile: Files) :Promise<Files[]> => {
    try{
        const file = await axios.post<Files[]>(`${process.env.REACT_APP_BASE_URL}/api/upload`, uploadFile, {withCredentials: true})
        return file.data

    }catch (error){
        console.error(error)
        throw error
    }
}

export const delete_file = async (ids: string[]) :Promise<Files[]> => {

    const queryParams = ids.map(id => `ids=${id}`).join('&');

    try{
        const file = await axios.delete<Files[]>(`${process.env.REACT_APP_BASE_URL}/api/delete?${queryParams}`, {withCredentials: true})
        return file.data

    }catch (error){
        console.error(error)
        throw error
    }
}