import React, {useState, useRef, MouseEvent, useEffect} from 'react';
import "./authentication.scss"
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface isActive{
    loginBtn: boolean,
    signupBtn: boolean,
}
function Authentication() {

    const [isActive, setIsActive] = useState<isActive>({loginBtn: true, signupBtn: false})

    const modalRef = useRef<HTMLDivElement>(null);




    return (
        <div className="authentication " >


            <div className="modal-container rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" ref={modalRef}>


                <h2 className="auth-title">Welcome to Cloud Storage</h2>

                <div className="tab-list">
                    <button type="button"
                            className={ isActive.loginBtn ? "isActive" : ""}
                            onClick={() => setIsActive({signupBtn: false, loginBtn: true})}>

                        Sign in
                    </button>
                    <button type="button"
                            className={ isActive.signupBtn ? "isActive" : ""}
                            onClick={() => setIsActive({loginBtn: false, signupBtn: true})}>
                        New Account</button>
                </div>
                {isActive.loginBtn ? (<Login/>) : (<Signup/>)}
            </div>
        </div>
    );
}

export default Authentication;