import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

import { useAuthContext } from "../context/AuthContext";

export default function HomeLayout () {

    const { auth, setAuth } = useAuthContext()

    if(!auth.logged){
        console.log("Must login first")
        return(
            <Navigate to="/" />
        )
    }
    
    React.useEffect(() => {
    },[auth])

    return(
        <div id="home-layout">
            <Navbar/>
            <Outlet/>
        </div>
    )
}