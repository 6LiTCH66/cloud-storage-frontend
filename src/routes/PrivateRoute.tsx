import React, {FC, ReactNode, useEffect, useLayoutEffect} from 'react';
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import {UserAuthentication} from "../types/UserAuthentication";
import {Navigate, useLocation, useNavigate, Route} from "react-router-dom";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {get_user, login} from "../http/userAPI";
import {setUser} from "../store/userSlice";
interface AuthenticatedProps {
    children: React.ReactNode;
}

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient()
    const { isAuthenticated, isLoading, user } = useAuthenticatedUser();



    useEffect(() => {


        if (!isLoading && !isAuthenticated) {
            navigate("/auth", { state: { from: location } });
        }

    }, [navigate, isAuthenticated, isLoading, location]);


    if (isLoading){
        toast.loading('Loading...');
        return null
    }

    if (!isLoading){
        setTimeout(() => toast.dismiss(), 0)
    }




    return isAuthenticated ? <>{children}</> : null;
};

export default Authenticated;