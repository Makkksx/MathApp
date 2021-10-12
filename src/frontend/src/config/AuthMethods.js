import {FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();