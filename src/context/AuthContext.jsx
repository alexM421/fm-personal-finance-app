import React from "react";

const AuthContext = React.createContext(undefined)

export function AuthProvider ( { children }) {

    const [auth, setAuth] = React.useState({
        logged: false,
        userData: undefined,
    })

    const value = {
        auth: auth,
        setAuth: setAuth,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext () {

    const context = React.useContext(AuthContext)

    if(!context){
        throw new Error("useAuthContext must be used within a AuthProvider")
    }
    return context
}