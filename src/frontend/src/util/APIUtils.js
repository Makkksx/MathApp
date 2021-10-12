import {getDownloadURL, getStorage, ref} from "firebase/storage";
import axios from "axios";

const storage = getStorage();

export const getURLData = (url) =>
    new Promise((resolve, reject) => {
        getDownloadURL(ref(storage, url))
            .then(async (url) => {
                await axios.get(url)
                    .then(response => {
                        resolve(response.data);
                    }).catch((error) => {
                        reject(new Error("No access!"))
                        console.log(error);
                    });
            })
    });
