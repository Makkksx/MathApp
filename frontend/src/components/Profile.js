import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../service/Auth";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAlert} from "react-alert";
import {Card, Container, ListGroup} from "react-bootstrap";
import TasksTable from "./ProfileBlocks/TasksTable";

export default function Profile() {
    const {currentUser} = useContext(AuthContext);
    const [profileData, setProfileData] = useState([]);
    const {uid} = useParams()
    const alert = useAlert()
    useEffect(() => {
        async function fetchData() {
            await currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get("/admin/getProfile", {
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
                alert.show("Bad token", {timeout: 2000, type: 'error'})
                console.log(error)
            });
        }

        fetchData().catch((error) => {
            console.log(error)
        })

    }, [uid, currentUser, alert]);
    if (!profileData) {
        return <p>User not found</p>;
    }
    return (
        <Container className={"mt-2"}>
            <Card>
                <Card.Header>
                    <Card.Title as={"h2"}>
                        {profileData.username}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item as={"h5"}>Number of tasks created: {profileData.createdTasks}</ListGroup.Item>
                        <ListGroup.Item as={"h5"}>Number of solved tasks: {profileData.solvedTasks}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            {profileData.uid ? (<TasksTable uid={profileData.uid}/>) : <>Loading...</>}
        </Container>
    );
}