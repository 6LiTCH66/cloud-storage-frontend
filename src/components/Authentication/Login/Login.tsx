import React, {FormEvent, useEffect, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {RootState, useAppDispatch} from "../../../store/store";
import {setUser, userLogin} from "../../../store/userSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {get_user, login} from "../../../http/userAPI";
import {upload_file} from "../../../http/filesAPI";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";

function Login() {
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData('user', data)
            navigate("/dashboard")
        },
    })


    const [logging, setLogging] = useState<boolean>(false);


    const handleUserForm = async (event: FormEvent) => {
        event.preventDefault()


        toast.promise(
            mutation.mutateAsync(userCredentials),
            {
                loading: 'Signing in...',
                success: "Congratulations! You have successfully signed in to your account.",
                error: "Sorry, we were unable to sign you in. Please check your username and password and try again.",
            },
            {
                position: 'top-center',
            }
        )

    }


    // useEffect(() => {
    //     if (status === "succeeded" && Object.keys(currentUser).length !== 0){
    //         localStorage.setItem("user", JSON.stringify(currentUser))
    //         navigate("/dashboard")
    //
    //     }else if(status === "failed"){
    //         localStorage.removeItem("user")
    //     }
    //
    // }, [status]);


    return (
        <div className="tab-container">

            <form onSubmit={handleUserForm}>
                <div>
                    <label htmlFor="login-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                    <input type="email" name="email"
                           value={userCredentials.email} id='login-email' required={true} onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                           placeholder="name@company.com" />

                </div>

                <div>
                    <label htmlFor="login-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        password</label>
                    <input type="password" name="password" placeholder="••••••••"
                           value={userCredentials.password} required={true} id="login-password" onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                </div>
                <button type="submit"
                        disabled={logging}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login
                    to your account
                </button>

            </form>

        </div>
    );
}

export default Login;