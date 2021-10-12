import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {useAlert} from "react-alert";
import {getURLData} from "../util/APIUtils";
import MDEditor from "@uiw/react-md-editor";
import {Badge, Card, Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {AuthContext} from "../service/Auth";

export default function Task() {
    const {currentUser} = useContext(AuthContext);
    const [taskData, setTaskData] = useState([]);
    const [condition, setCondition] = useState("");
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const {taskId} = useParams();
    const alert = useAlert()
    useEffect(() => {
        async function fetchData() {
            await currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get(API_BASE_URL + "/task/getTask", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                    params: {
                        taskId: taskId
                    },
                })
                    .then(async response => {
                        await getURLData(response.data.conditionURL).then((condition) => {
                            setCondition(condition);
                        });
                        setTaskData(response.data)
                        setTags(response.data.tags)
                        setImages(response.data.images)
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

    }, [taskId, alert, currentUser]);
    return (
        <Container className=" mt-2 mx-auto text-center">
            <Card>
                <Card.Header>
                    <Card.Title as={"h2"}>
                        {taskData.title}
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                        {taskData.theme}
                    </Card.Subtitle>
                    {
                        tags.map((tag, index) => (
                            <Badge key={index} bg="primary" className="mx-1">{tag}</Badge>
                        ))
                    }
                </Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><MDEditor.Markdown source={condition}/></ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                {images.map((image, index) => (
                                    <Col key={index}>
                                        <Image src={image} rounded height={"30%"}/>
                                    </Col>
                                ))}
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                {/*<Card.Text>*/}
                {/*</Card.Text>*/}
            </Card>
        </Container>
    );
}