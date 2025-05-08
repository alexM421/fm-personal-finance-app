import React from "react";

import HidePassword from "../svg/HidePassword";

import { Link, useNavigate } from "react-router-dom";

export default function SignUp () {

    const navigate = useNavigate()
    
    const [errors, setErrors] = React.useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        accountError: false,
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
        errorsTracker["nameError"] = !inputs.signupName.validity.valid
        errorsTracker["emailError"] = !inputs.signupEmail.validity.valid
        errorsTracker["passwordError"] = !inputs.signupPassword.validity.valid

        const name = inputs.signupName.value
        const email = inputs.signupEmail.value
        const password = inputs.signupPassword.value
        const localStorageValue = {name: name, password: password}

        if(!Object.values(errorsTracker).every(error => !error)){
            errorsTracker.accountError = false;
            setErrors(errorsTracker)
        }
        else if(localStorage.getItem(email)){
            errorsTracker.accountError = true;
            setErrors(errorsTracker)
        }
        else{
            localStorage.setItem(email, JSON.stringify(localStorageValue))
            errorsTracker.accountError = false;
            setErrors(errorsTracker)
            navigate("/") //redirect to login screen
        }
    }

    console.log(errors)

    return(
        <div className="auth-container" >
            <form className="auth" onSubmit={handleSubmit} noValidate>
                <div className="auth-title">
                    <h1 className="text-preset-1">Sign Up</h1>
                    {errors.accountError? <p className="text-preset-5 error-text">An account using this email already exists.</p>:""}
                </div>
                <div className="auth-inputs">
                    <div className="auth-input-div">
                        <label htmlFor="signup-name" className="text-preset-5-bold">Name</label>
                        <input 
                        className={`auth-input ${errors.nameError? "error-input":""}`}
                        type="text" 
                        id="signupName"
                        autoComplete="name"
                        name="name"
                        required
                        />
                        {errors.nameError? <p className="text-preset-5 error-text">Please enter your name</p>:""}
                    </div>
                    <div className="auth-input-div">
                        <label htmlFor="signup-email" className="text-preset-5-bold">Email</label>
                        <input 
                        className={`auth-input ${errors.emailError? "error-input":""}`}
                        type="email" 
                        id="signupEmail"
                        autoComplete="email"
                        name="email"
                        required
                        />
                        {errors.emailError? <p className="text-preset-5 error-text">Please enter a valid email address</p>:""}
                    </div>
                    <div className="auth-input-div">
                        <label className="text-preset-5-bold">Create Password</label>
                        <div htmlFor="signup-password" className={`auth-password-div ${errors.passwordError? "error-input":""}`}>
                            <input 
                            className="auth-input-password" 
                            type={isPasswordVisible? "text":"password"} 
                            id="signupPassword"
                            autoComplete="new-password"
                            name="password"
                            minLength={8}
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
                                    <HidePassword/>
                                </label>
                            </div>
                        </div>
                        <p className={`text-preset-5 password-requirement-text ${errors.passwordError? "error-text":""}`}>Password must be at least 8 characters</p>
                    </div>
                </div>
                <button className="auth-btn text-preset-4-bold">Create Account</button>
                <div className="link-text">
                    <p className="text-preset-4">Alraedy have an account?</p>
                    <Link to="/" className="text-preset-4-bold">Log In</Link>
                </div>
            </form>
        </div>
    )
}