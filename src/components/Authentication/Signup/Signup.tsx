import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {registration} from "../../../http/userAPI";
import toast from "react-hot-toast";
import {deleteFiles} from "../../../store/filesSlice";
// import toast from 'react-hot-toast';

function Signup() {
    const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false)
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const [signing, setSigning] = useState<boolean>(false)

    const handleSingupForm = async (event: FormEvent) => {
        event.preventDefault()

        toast.promise(
            registration(userCredentials).then(() =>{

            }),
            {
                loading: 'Signing up...',
                success: "Congratulations! Your sign-up was successful. Welcome to our community!",
                error: "Sorry, we couldn't sign you up at this time. Please check that all fields are filled out correctly and try again.",
            },
            {
                position: 'top-center',
            }
        );

        setUserCredentials({email: "", password: ""})


    }


    return (
        <div className="tab-container">

            <form onSubmit={handleSingupForm}>
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
                        disabled={signing}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Signup your account
                </button>

            </form>

        </div>
    );
}

export default Signup;