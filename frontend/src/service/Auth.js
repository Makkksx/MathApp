import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import firebase from "../config/FirebaseConfig";

export const AuthContext = React.createContext();
const auth = getAuth(firebase);
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }
    return (
        <AuthContext.Provider
            value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};