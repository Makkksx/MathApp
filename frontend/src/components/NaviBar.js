import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {getAuth} from "firebase/auth";
import {AuthContext} from "../service/auth";
import {ACCESS_TOKEN} from "../constants";

export default function NaviBar() {
    const {currentUser} = useContext(AuthContext);
    const handleLogout = () =>{
        localStorage.removeItem(ACCESS_TOKEN);
        getAuth().signOut();
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to="/home">
                        <Navbar.Brand>MathApp</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/admin">
                                <Nav.Link>Admin</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            {currentUser ? (
                                <button className="btn btn-primary" onClick={() => handleLogout()}
                                        type="submit">Sign-out</button>
                            ) :(<LinkContainer to="/login">
                                <button className="btn btn-primary" type="submit">Sign-up</button>
                            </LinkContainer>) }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}