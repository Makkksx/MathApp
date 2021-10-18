import {Button, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {useAlert} from "react-alert";
import {AuthContext} from "../../service/Auth";
import axios from "axios";


export default function TaskAnswerChecker({taskId, answers, solved, getSolved}) {
    const {currentUser} = useContext(AuthContext);
    const [answer, setAnswer] = useState("");

    const alert = useAlert()

    const sendAnswer = async () => {
        await currentUser.getIdToken(true).then(async (idToken) => {
            await axios.post("/task/utils/currentAnswer", taskId, {
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (solved) {
            alert.show("The task has already been solved!", {timeout: 2000, type: 'info'})
        } else {
            if (answers.includes(answer)) {
                alert.show("Correct answer!", {timeout: 2000, type: 'success'})
                await sendAnswer();
                getSolved(true);
            } else {
                alert.show("Wrong answer!", {timeout: 2000, type: 'error'})
            }
        }
    }
    return (
        <Form className="col-md-5 mx-auto" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label as={"h4"}>Your answer:</Form.Label>
                <Form.Control className="mt-3"
                              required
                              type="text"
                              placeholder="Enter your answer..."
                              value={answer}
                              onChange={event => {
                                  setAnswer(event.target.value)
                              }}
                />
            </Form.Group>
            <Button className="mt-3 mb-3" variant="primary" size="lg" type="submit">Check</Button>
        </Form>
    )
}