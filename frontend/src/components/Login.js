import React, {useContext} from "react";
// import {GOOGLE_AUTH_URL} from "../constants";
import {facebookProvider, githubProvider, googleProvider} from "../config/authMethods";
import socialMediaAuth from "../service/socialAuth";
import {AuthContext} from "../service/auth";
import {Redirect} from "react-router-dom";
import {ACCESS_TOKEN} from "../constants";
import { login } from '../util/APIUtils';

export default function Login() {
    const handleOnClick = async (provider) => {
        const response  = await socialMediaAuth(provider);
        const loginRequest = Object.assign({}, {
            email: response.email,
            provider: provider.providerId,
            name: response.displayName,
            });
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            }).catch(error => {
            console.log(error);
        });
        console.log(response)
    };
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
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

