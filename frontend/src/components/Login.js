import React, {useContext} from "react";
import {facebookProvider, githubProvider, googleProvider} from "../config/AuthMethods";
import {AuthContext} from "../service/auth";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {getAuth, signInWithPopup} from "firebase/auth";
import firebase from "../config/FirebaseConfig";
import {useAlert} from "react-alert";

const auth = getAuth(firebase);
export const Login = () => {
    const alert = useAlert()
    const {currentUser} = useContext(AuthContext);
    const handleOnClick = async (provider) => {
        await signInWithPopup(auth, provider);
        // await socialMediaAuth(provider);
        console.log(provider)
        await auth.currentUser.getIdToken(true).then((idToken) => {
            axios.post(API_BASE_URL + "/auth/login", {},{
                headers: {
                    "Content-Type": "application/json",
                    idToken: idToken,
                },
            }).catch((error) =>{
                alert.show("No access!", {timeout: 2000,type: 'error'})
                console.log(error)
            });
        }).catch((error) =>{
            alert.show("Bad token", {timeout: 2000,type: 'error'})
            console.log(error)
        });
    };

    if (currentUser) {
        return <Redirect to="/"/>;
    }
    return (
        <div className="container mt-3 mb-2 text-center">
            <div className="container mt-2 mb-2">
                <div className="btn btn-lg btn-secondary fab fa-google col-3"
                     onClick={() => handleOnClick(googleProvider)}>Continue with Google
                </div>
            </div>
            <div className="container mt-2 mb-2">
                <div className="btn btn-lg btn-secondary fab fa-facebook col-3"
                     onClick={() => handleOnClick(facebookProvider)}>Continue with Facebook
                </div>
            </div>
            <div className="container mt-2 mb-2">
                <div className="btn btn-lg btn-secondary fab fa-github col-3"
                     onClick={() => handleOnClick(githubProvider)}>Continue with GitHub
                </div>
            </div>
        </div>
    )
}

