import {TagCloud} from "react-tagcloud";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../../constants";
import {useAlert} from "react-alert";
import {getAuth} from "firebase/auth";
import firebase from "../../config/FirebaseConfig";

const auth = getAuth(firebase);
export default function HomeTagCloud() {
    const [tagData, setTagData] = useState([]);
    const alert = useAlert()
    useEffect(() => {
        async function fetchData() {
            await auth.currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get(API_BASE_URL + "/task/getAllTags", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                })
                    .then(response => {
                        setTagData(response.data)
                        console.log(response.data)
                    }).catch((error) => {
                        alert.show("No access!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
            }).catch((error) => {
                alert.show("Bad token", {timeout: 2000, type: 'error'})
                console.log(error)
            });
        }

        fetchData().catch((error) => {
            console.log(error)
        })

    }, [alert]);
    return (
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={tagData}
            // onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
    )
}