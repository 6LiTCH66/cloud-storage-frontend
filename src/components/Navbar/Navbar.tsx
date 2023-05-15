import React from 'react';
import './navbar.scss'
import {FiMenu} from "react-icons/fi"
import {useState} from "react";
import {RiCloseLine} from "react-icons/ri"
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineCloud} from "react-icons/ai"

import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {userLogout} from "../../store/userSlice";

function Navbar() {
    const [toggle, setToggle] = useState<boolean>(false);
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const { currentUser, status, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        dispatch(userLogout())
        localStorage.removeItem("user")
        navigate("/auth")

    }

    return (
        <div className="navbar">
            <div className="container">

                <div className="logo" >
                    <AiOutlineCloud size={30} color={"white"}/>
                    <p>Cloud Storage</p>
                </div>

                <FiMenu size={40} className="burger" onClick={() => setToggle(prevState => !prevState)}/>


                <div className="menu" data-toggle={toggle ? "toggle" : ""}>

                    <RiCloseLine size={40} className="close" onClick={() => setToggle(prevState => !prevState)}/>
                    <ul>

                        <li onClick={() => setToggle(false)}>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>

                        <li onClick={() => setToggle(false)}>
                            <Link to="#">Profile</Link>
                        </li>


                    </ul>

                    <div>
                    </div>

                    <div className="signIn">


                        {isAuth ? (
                            <Link to="#" onClick={handleLogout}>Logout</Link>

                        ): (
                            <Link to="/auth">Sing in</Link>

                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Navbar;