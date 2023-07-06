import React, {useEffect} from 'react';
import './App.scss';
import {Authentication, Header, Navbar} from "./components";
import {Dashboard} from "./pages";
import Routes from "./routes/routes"
import {BrowserRouter, useNavigate, useNavigation} from "react-router-dom";
import {get_user} from "./http/userAPI";
import {RootState, useAppDispatch} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "./store/userSlice";
import {UserAuthentication} from "./types/UserAuthentication";
import {Toaster} from "react-hot-toast";

function App() {

    const dispatch = useAppDispatch()
    const dispatchApp = useDispatch()

    // const { currentUser, status, isAuth } = useSelector(
    //     (state: RootState) => state.userSlice
    // );

    // useEffect(() => {
    //     dispatch(getUser())
    //
    //
    // }, [dispatch]);


    // useEffect(() => {
    //
    //     if (status === "succeeded" && Object.keys(currentUser).length !== 0){
    //
    //         localStorage.setItem("user", JSON.stringify(currentUser))
    //     }
    //     else if (Object.keys(currentUser).length === 0){
    //         localStorage.removeItem("user")
    //
    //     }
    // }, [status, currentUser]);


  return (
    <div className="App">
        <BrowserRouter>

            <Routes/>
        </BrowserRouter>
        <Toaster position="top-right" toastOptions={{

            className: 'notification',

        }}/>
    </div>
  );
}

export default App;
