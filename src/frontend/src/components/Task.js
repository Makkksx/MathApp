import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAlert} from "react-alert";
import {getURLData} from "../util/APIUtils";
import MDEditor from "@uiw/react-md-editor";
import {Badge, Card, Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {AuthContext} from "../service/Auth";
import TaskAnswerChecker from "./TaskBlocks/TaskAnswerChecker";
import {Rating, RatingView} from "react-simple-star-rating";

export default function Task({mode = "view"}) {
    const [rating, setRating] = useState(0)
    const [ratingSend, setRatingSend] = useState(false)
    const {currentUser} = useContext(AuthContext);
    const [taskData, setTaskData] = useState([]);
    const [condition, setCondition] = useState("");
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const {taskId} = useParams();
    const alert = useAlert()
    const [solved, setSolved] = useState(false);
    const getSolved = useCallback((solved) => {
        setSolved(solved)
    }, []);
    useEffect(() => {
        async function fetchData() {
            await currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get("/task/getTask", {
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
                        setRating(response.data.rating)
                    }).catch((error) => {
                        alert.show("No access!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
                await axios.get("/task/checkSolvedTask", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                    params: {
                        taskId: taskId
                    },
                })
                    .then((response) => {
                        setSolved(response.data)
                    })
                    .catch((error) => {
                        alert.show("No access!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
                await axios.get("/task/checkTaskRated", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                    params: {
                        taskId: taskId
                    },
                })
                    .then((response) => {
                        setRatingSend(response.data)
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

        fetchData().catch((error) => {
            console.log(error)
        })

    }, [alert, currentUser, taskId]);

    async function addRating(rate) {
        await currentUser.getIdToken(true).then(async (idToken) => {
            await axios.post("/task/addRating", [], {
                headers: {
                    "Content-Type": "application/json",
                    idToken: idToken,
                },
                params: {
                    taskId: taskId,
                    rating: rate
                },
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

    const handleRating = async (rate) => {
        if (!ratingSend) {
            setRating(rate)
            setRatingSend(true)
            await addRating(rate);
        } else {
            alert.show("You have already set a rating", {timeout: 2000, type: 'error'})
        }
    }
    return (
        <Container className=" mt-2 mx-auto text-center">
            <Card>
                <Card.Header>
                    <Card.Title as={"h2"}>
                        {taskData.title}
                    </Card.Title>
                    {(!ratingSend && mode === "view") ? (<Rating onClick={handleRating} ratingValue={rating}/>) : (
                        <RatingView ratingValue={rating}/>)}
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
                                        <Image src={image} rounded width={"300"}/>
                                    </Col>
                                ))}
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                {mode === "edit" ? (
                    <div>
                        <h4>Answers:</h4>
                        {!!taskData.answers ? taskData.answers.map((answer, index) => (
                            <div key={index}>{answer}</div>
                        )) :<div/>}
                    </div>
                    )
                    :
                    (<TaskAnswerChecker taskId={taskData.id} answers={taskData.answers} solved={solved}
                                                          getSolved={getSolved}/>)}

            </Card>
        </Container>
    );
}