import React, {useState, useRef, MouseEvent} from 'react';
import "./authentication.scss"
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import {IoMdClose} from "react-icons/io"
// import {toggleModal} from "../../store/modalSlice";
// import { useDispatch, useSelector } from 'react-redux';
// import {RootState} from "../../store/store"

interface isActive{
    loginBtn: boolean,
    signupBtn: boolean,
}
function Authentication() {
    // const isModalShow = useSelector((state: RootState) => state.modalWindow.showModal)
    // const dispatch = useDispatch()
    //
    const [isActive, setIsActive] = useState<isActive>({loginBtn: true, signupBtn: false})

    const modalRef = useRef<HTMLDivElement>(null);

    const handleCloseModal = () => {
        // dispatch(toggleModal())
    }

    const handleClickOutsideModal = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            // handleCloseModal()
        }
    }
    return (
        <div className="authentication " onClick={handleClickOutsideModal}>


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