import {getDownloadURL, getStorage, ref} from "firebase/storage";
import axios from "axios";
import {getAuth} from "firebase/auth";
import firebase from "../config/FirebaseConfig";

const storage = getStorage();
const auth = getAuth(firebase);

export const getURLData = (url) =>
    new Promise((resolve, reject) => {
        getDownloadURL(ref(storage, url))
            .then((url) => {
                auth.currentUser.getIdToken(true).then(async () => {
                    await axios.get(url)
                        .then(response => {
                            resolve(response.data);
                        }).catch((error) => {
                            reject(new Error("No access!"))
                            console.log(error);
                        });
                }).catch((error) => {
                    reject(new Error("Bad token"))
                    console.log(error)
                });
            })
    });
