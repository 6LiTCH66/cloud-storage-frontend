import React, {FormEvent, useEffect, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {login} from "../../../http/userAPI";
import {getFiles} from "../../../http/filesAPI";
// import toast from 'react-hot-toast';
// import {useDispatch} from "react-redux";
// import {toggleModal} from "../../../store/modalSlice";
// import store from "../../../store/store";
// import {setUser} from "../../../store/userSlice";
import {RootState, useAppDispatch} from "../../../store/store";
import {userLogin} from "../../../store/userSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Login() {
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    // const dispatch = useDispatch()
    const [logging, setLogging] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { currentUser, status, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );

    const handleUserForm = async (event: FormEvent) => {
        event.preventDefault()

        dispatch(userLogin(userCredentials))

    }


    useEffect(() => {
        if (status === "succeeded" && Object.keys(currentUser).length !== 0){
            localStorage.setItem("user", JSON.stringify(currentUser))
            navigate("/dashboard")

        }else if(status === "failed"){
            localStorage.removeItem("user")
        }

    }, [status]);


    return (
        <div className="tab-container">
            <form onSubmit={handleUserForm}>
                <label htmlFor="login-email">Email</label>
                <input type="email" value={userCredentials.email} id='login-email' required={true} onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})} placeholder="Enter email"/>

                <label htmlFor="login-password">Password</label>
                <input type="password" value={userCredentials.password} required={true} id="login-password" onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})} placeholder="Enter password"/>
                <button type="submit" disabled={logging} className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Login;