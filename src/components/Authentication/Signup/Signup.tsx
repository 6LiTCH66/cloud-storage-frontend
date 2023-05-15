import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
// import {signup} from "../../../http/userAPI";
// import toast from 'react-hot-toast';

function Signup() {
    const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false)
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const [signing, setSigning] = useState<boolean>(false)

    const handleSingupForm = async (event: FormEvent) => {
        event.preventDefault()



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