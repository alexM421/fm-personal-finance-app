import React from "react";

export default function AuthLayoutPicture () {

    return(
        <div id="auth-layout-picture-container">
            <div id="auth-layout-picture">
                <img src="/assets/images/logo-large.svg" id="auth-logo"/>
                <img src="/assets/images/illustration-authentication.svg" id="auth-illustration"/>
                <div id="auth-layout-text">
                    <h1 className="text-preset-1">Keep track of your money<br/>and save for your future</h1>
                    <p className="text-preset-4">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                </div>
            </div>
        </div>
    )
}