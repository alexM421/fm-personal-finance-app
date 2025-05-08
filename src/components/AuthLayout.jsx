import React from "react";

import { Outlet } from "react-router-dom"
import AuthLayoutPicture from "./AuthLayoutPicture";
import Login from "./Login";

export default function AuthLayout () {


    return(
        <div id="auth-layout">
            <AuthLayoutPicture/>
            <Outlet/>
        </div>
    )
}