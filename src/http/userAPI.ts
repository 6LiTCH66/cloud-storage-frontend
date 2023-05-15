import {UserAuthentication} from "../types/UserAuthentication";
import axios from "axios";

export const login = async (userCredentials: UserAuthentication):Promise<UserAuthentication> => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/signin`, userCredentials, {withCredentials: true})
        return user.data

    }catch (error){
        console.error(error)
        throw error
    }

}

export const registration = async (userCredentials: UserAuthentication):Promise<UserAuthentication> => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/signup`, userCredentials, {withCredentials: true})
        return user.data

    }catch (error){
        console.error(error)
        throw error
    }
}


export const logout = async ():Promise<{message: string}> => {
    try{
        const user = await axios.post<{message: string}>(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {}, {withCredentials: true})
        return user.data

    }catch (error){
        console.error(error)
        throw error
    }
}


export const get_user = async ():Promise<UserAuthentication> => {
    try{
        const user = await axios.get<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/user/get-user`, {withCredentials: true})
        return user.data

    }catch (error){
        console.error(error)
        throw error
    }
}