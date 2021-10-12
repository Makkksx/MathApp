import React, {Fragment, useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";

export default function TaskAnswer({getAnswer}) {
    const [answers, setAnswers] = useState([
        {answer: ''}
    ]);
    useEffect(() => {
        getAnswer(answers)
    }, [getAnswer, answers])
    const handleAddFields = () => {
        const values = [...answers];
        if (values.length < 3) {
            values.push({answer: ''});
            setAnswers(values);
        }
    };
    const handleRemoveFields = index => {
        const values = [...answers];
        if (values.length > 1) {
            values.splice(index, 1);
            setAnswers(values);
        }
    };
    const handleInputChange = (index, event) => {
        const values = [...answers];
        values[index].answer = event.target.value;
        setAnswers(values);
    };
    return (
        <Form.Group className="container mt-2">
            <Form.Label><h4>Set answers</h4></Form.Label>
            {answers.map((answers, index) => (
                <Fragment key={`${answers}~${index}`}>
                    <Row className="mt-2">
                        <Col md={10}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Answer"
                                value={answers.answer}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please set a answer.
                            </Form.Control.Feedback>
                        </Col>
                        <Col md={2}>
                            <ButtonGroup>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleRemoveFields(index)}>
                                    -
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleAddFields()}>
                                    +
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Fragment>
            ))}
        </Form.Group>
    )
}
