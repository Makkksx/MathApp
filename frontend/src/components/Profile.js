import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../service/auth";
import {Redirect, useParams} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {getAuth} from "firebase/auth";
import firebase from "../config/FirebaseConfig";
import {useAlert} from "react-alert";

const auth = getAuth(firebase);
export default function Profile() {
    const {currentUser} = useContext(AuthContext);
    const [profileData, setProfileData] = useState([]);
    const {uid} = useParams()
    const alert = useAlert()
    useEffect(() => {
        async function fetchData() {
            await auth.currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get(API_BASE_URL + "/admin/getProfile", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                    params: {
                        uid: uid
                    },
                })
                    .then(response => {
                        setProfileData(response.data)
                    }).catch((error) => {
                        alert.show("No access!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
            }).catch((error) => {
                alert.show("Bad token", {timeout: 2000,type: 'error'})
                console.log(error)
            });
        }

        fetchData().catch((error) =>{
            console.log(error)
        })

    }, [uid, alert]);
    // с privateroute убрать
    if (!currentUser) {
        return <Redirect to="/"/>;
    }
    if (!profileData) {
        return <p>User not found</p>;
    }
    return (
        <div>
            <p>11111111111</p>
            <p>{profileData.username}</p>
            <p>{profileData.createdTasks}</p>
            <p>{profileData.solvedTasks}</p>
            <p>{profileData.provider}</p>
        </div>
    );
}