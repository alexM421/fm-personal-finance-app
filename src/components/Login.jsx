import React from "react";
import { Link, useNavigate } from "react-router-dom";

import HidePassword from "../svg/HidePassword";
import ShowPassword from "../svg/ShowPassword";

import { useAuthContext } from "../context/AuthContext";

import DefaultData from "../../data.json"

export default function Login () {

    const { auth, setAuth } = useAuthContext()

    const navigate = useNavigate()

    const [errors, setErrors] = React.useState({
        emailError: false,
        passwordError: false,
        authError: false,
    })

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    const handlePassword = () => {
        setIsPasswordVisible(prevState => !prevState)
    }

    const handleSubmit = (e) => {

            e.preventDefault()
   
            const inputs = e.target.elements
            const errorsTracker = {}

            //checks errors for inputs
            errorsTracker["emailError"] = !inputs["login-email"].validity.valid
            errorsTracker["passwordError"] = !inputs["login-password"].validity.valid
    
            const email = inputs["login-email"].value
            const password = inputs["login-password"].value
            const oKCredentials = JSON.parse(localStorage.getItem(email))?.password === password
            const userData = JSON.parse(localStorage.getItem(email))?.userData || undefined
            console.log(userData)


            if(!Object.values(errorsTracker).every(error => !error)){
                setErrors(prevErrors => ({...prevErrors, ...errorsTracker}))
            }
            else if(!oKCredentials){
                errorsTracker.authError = true;
                setErrors(errorsTracker)
            }else{
                errorsTracker.authError = false;
                setErrors(errorsTracker)
                setAuth({
                    logged: true,
                    userData: userData? userData:DefaultData
                }
                )
                navigate("/home")

            }
    }

    return(
        <div className="auth-container">
            <form className="auth" onSubmit={handleSubmit} noValidate>
                <div className="auth-title">
                    <h1 className="text-preset-1">Login</h1>
                    {errors.authError? <p className="text-preset-5 error-text">No account with this email/password was found</p>:""}
                </div>
                <div className="auth-inputs">
                    <div className="auth-input-div">
                        <label htmlFor="login-email" className="text-preset-5-bold">Email</label>
                        <input 
                        className={`auth-input ${errors.emailError? "error-input":""}`}
                        type="email" 
                        id="login-email"
                        autoComplete="email"
                        required
                        />
                        {errors.emailError? <p className="text-preset-5 error-text">Please enter a valid email address</p>:""}
                    </div>
                    <div className="auth-input-div">
                        <label className="text-preset-5-bold">Password</label>
                        <div htmlFor="login-password" className={`auth-password-div ${errors.passwordError? "error-input":""}`}>
                            <input 
                            className="auth-input-password" 
                            type={isPasswordVisible? "text":"password"} 
                            id="login-password"
                            autoComplete="current-password"
                            required
                            />
                            <div className="hide-password-div">
                                <input 
                                className="hide-password-input" 
                                type="checkbox"
                                checked={isPasswordVisible}
                                onChange={handlePassword}
                                id="hide-password-input"
                                name="hide-password-input"
                                />
                                <label className="hide-password-label" htmlFor="hide-password-input">
                                    {isPasswordVisible? <ShowPassword/>:<HidePassword/>}
                                </label>
                            </div>
                        </div>
                        {errors.passwordError? <p className="text-preset-5 error-text">Please enter your password</p>:""}
                    </div>
                </div>
                <button className="auth-btn text-preset-4-bold">Login</button>
                <div className="link-text">
                    <p className="text-preset-4">Need to create an account?</p>
                    <Link to="/sign-up" className="text-preset-4-bold">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}