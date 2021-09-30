import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../service/auth";
import {Redirect, useParams} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {getAuth} from "firebase/auth";
import firebase from "../config/FirebaseConfig";

const auth = getAuth(firebase);
export default function Profile() {
    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const {uid} = useParams()
    useEffect(() => {
        async function fetchData() {
            await auth.currentUser.getIdToken(true).then((idToken) => {
                axios.get(API_BASE_URL + "/admin/getProfile", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                    params: {
                        uid: uid
                    },
                })
                    .then(response => {
                        setData(response.data)
                    }).catch((error) => {
                    console.log("!111")
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error)
            });
        }

        fetchData().catch((error) =>{
            console.log(error)
        })
    }, [uid]);
    if (!currentUser) {
        return <Redirect to="/"/>;
    }
    if (!data) {
        return <p>User not found</p>;
    }
    return (
        <div>
            <p>{data.username}</p>
            <p>{data.createdTasks}</p>
            <p>{data.solvedTasks}</p>
        </div>
    );
}