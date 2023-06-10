import axios, {AxiosRequestConfig} from "axios"
import {Folder} from "../types/Folder";
import {Files} from "../types/Files";



export const upload_folder = async (uploadFolder: Folder):Promise<any[]> => {
    console.log(JSON.stringify(uploadFolder))

    try{
        const file = await axios.post<any[]>(`${process.env.REACT_APP_BASE_URL}/folder/create`, uploadFolder, {withCredentials: true})
        // console.log(file);
        return file.data

    }catch (error){
        console.error(error)
        throw error
    }
}