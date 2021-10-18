import React from "react";
import {TaskCreation} from "./TaskCreation";
import {Col, Container, Row} from "react-bootstrap";
import Task from "./Task";

export default function TaskEdit() {

    return (
        <Container>
            <Row>
                <Col>
                    <Task mode="edit"/>
                </Col>
                <Col>
                    <TaskCreation mode="edit"/>
                </Col>
            </Row>
        </Container>
    )
}
