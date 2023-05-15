import axios, {AxiosRequestConfig} from "axios"
import {Files} from "../types/Files";
export const getFiles = async ():Promise<Files[]> => {
    try{
        const files = await axios.get<Files[]>(`${process.env.REACT_APP_BASE_URL}/api/files`, {withCredentials: true})
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