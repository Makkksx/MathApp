import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useAlert} from "react-alert";
import {Badge, Button, Card, Col, Container, Form} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {getURLData} from "../../util/APIUtils";
import MDEditor from '@uiw/react-md-editor';
import {AuthContext} from "../../service/Auth";
import {RatingView} from "react-simple-star-rating";

export default function HomeTasks() {
    const [tasks, setTasks] = useState([]);
    const alert = useAlert();
    const [sorted, setSorted] = useState("dateUp");
    const [pending, setPending] = useState(true);
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        async function fetchData() {
            await axios.get("/task/getAllTasks")
                .then(async response => {
                    for (const task of response.data) {
                        await getURLData(task.conditionURL).then((condition) => {
                            task.condition = condition;
                        })
                    }
                    // setTasks(response.data)
                    // setTasks(response.data.reverse())
                    setTasks(response.data.sort((a, b) => {
                        return b.id - a.id;
                    }))
                    setPending(false)
                }).catch((error) => {
                    alert.show("No access!", {timeout: 2000, type: 'error'})
                    console.log(error);
                });
        }

        fetchData().catch((error) => {
            console.log(error)
        })

    }, [alert]);
    if (pending) {
        return <>Loading...</>
    }
    const sortChange = (event) => {
        setSorted(event.target.value)
        if (event.target.value === "dateUp") {
            setTasks(tasks.sort((a, b) => {
                return b.id - a.id;
            }))
        } else if (event.target.value === "ratingUp") {
            setTasks(tasks.sort((a, b) => {
                return b.rating - a.rating;
            }))
        } else if (event.target.value === "dateDown") {
            setTasks(tasks.sort((a, b) => {
                return a.id - b.id;
            }))
        } else if (event.target.value === "ratingDown") {
            setTasks(tasks.sort((a, b) => {
                return a.rating - b.rating;
            }))
        }
    }
    return (
        <Container className={"mt-2"}>
            <Col md={3} className={"text-end"}>
                <Form.Select value={sorted} onChange={sortChange}>
                    <option value="dateUp">Sort by date (recent first)</option>
                    <option value="dateDown">Sort by date (recent first)</option>
                    <option value="ratingUp">Sort by rating (high first)</option>
                    <option value="ratingDown">Sort by rating (high first)</option>
                </Form.Select>
            </Col>
            {
                tasks.map((task, index) => (
                    <Card className={"mt-2"} key={index}>
                        <Card.Header>
                            <Card.Title as={"h2"}>
                                {task.title}
                            </Card.Title>
                            <RatingView ratingValue={task.rating}/>
                            <Card.Subtitle className="text-muted">
                                {task.theme}
                            </Card.Subtitle>
                            {
                                task.tags.map((tag, index) => (
                                    <Badge key={index} bg="primary" className="mx-1">{tag}</Badge>
                                ))
                            }
                        </Card.Header>
                        <Card.Body>
                            <MDEditor.Markdown source={task.condition}/>
                            {currentUser ? (<LinkContainer to={"/task/" + task.id}>
                                <Button className="mt-2">Go to task</Button>
                            </LinkContainer>) : <div/>}
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    );
}