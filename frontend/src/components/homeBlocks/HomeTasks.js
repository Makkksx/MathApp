import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../../constants";
import {useAlert} from "react-alert";
import {Badge, Button, Card, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default function HomeTasks() {
    const [tasks, setTasks] = useState([]);
    const alert = useAlert();
    const [pending, setPending] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await axios.get(API_BASE_URL + "/task/getAllTasks")
                .then(async response => {
                    // for (const task of response.data) {
                    //     await getURLData(task.conditionURL).then((condition) => {
                    //         task.condition = condition;
                    //     })
                    // }
                    setTasks(response.data)
                    // setTasks(response.data.reverse())
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
    return (
        tasks.map((task, index) => (
            <Container className={"mt-2"} key={index}>
                <Card>
                    <Card.Header>
                        <Card.Title as={"h2"}>
                            {task.title}
                        </Card.Title>
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
                        {/*<MDEditor.Markdown source={task.condition}/>*/}
                        <LinkContainer to={"/task/" + task.id}>
                            <Button className="mt-2">Go to task</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            </Container>
        ))
    );
}