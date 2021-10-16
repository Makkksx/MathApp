import React, {useContext, useEffect, useState} from 'react';
import Darkreader from 'react-darkreader';
import axios from "axios";
import {AuthContext} from "./service/Auth";
import {useAlert} from "react-alert";

export const DarkMode = () => {
    const alert = useAlert();
    const {currentUser} = useContext(AuthContext);
    const [pending, setPending] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const isDarkMode = async () => {
            await currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get("/auth/getDarkMode", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    }
                })
                    .then(response => {
                        setDarkMode(response.data);
                        setPending(false);
                    }).catch((error) => {
                        alert.show("No access!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
            }).catch((error) => {
                alert.show("Bad token", {timeout: 2000, type: 'error'})
                console.log(error)
            });
            return darkMode;
        };
        if (currentUser) {
            isDarkMode().catch((error) => {
                console.log(error);
            });
        }
    }, [alert, currentUser, darkMode]);
    const changeMode = async () => {
        await currentUser.getIdToken(true).then(async (idToken) => {
            await axios.post("/auth/changeDarkMode", [], {
                headers: {
                    "Content-Type": "application/json",
                    idToken: idToken,
                }
            })
                .catch((error) => {
                    alert.show("No access!", {timeout: 2000, type: 'error'})
                    console.log(error);
                });
        }).catch((error) => {
            alert.show("Bad token", {timeout: 2000, type: 'error'})
            console.log(error)
        });
    }
    const handleDarkMode = async (event) => {
        console.log(event)
        await changeMode();
    }
    if (!currentUser) {
        return <Darkreader/>
    }
    if (pending) {
        return <div/>
    }
    return (
        <Darkreader defaultDarken={darkMode} onChange={handleDarkMode}/>
    )
}