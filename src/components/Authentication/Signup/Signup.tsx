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
                <label htmlFor="login-email">Email</label>
                <input type="email"
                       required={true}
                       id='login-email'
                       value={userCredentials.email}
                       onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})}
                       placeholder="Enter email"/>

                <label htmlFor="login-password">Password</label>
                <input type="password"
                       required={true}
                       id="login-password"
                       value={userCredentials.password}
                       onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})}
                       placeholder="Create password"/>



                <button type="submit" disabled={signing} className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Signup;