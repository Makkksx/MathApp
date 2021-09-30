import React, {useContext, useEffect, useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {getAuth} from "firebase/auth";
import {AuthContext} from "../service/auth";

export default function NaviBar() {
    const {currentUser} = useContext(AuthContext);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdTokenResult()
                .then((idTokenResult) => {
                    if (!!idTokenResult.claims.admin && !admin) {
                        setAdmin(true)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            setAdmin(false)
        }
    }, [currentUser, admin]);

    const handleLogout = () => {
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
                            {admin ? (<LinkContainer to="/admin">
                                <Nav.Link>Admin</Nav.Link>
                            </LinkContainer>) : (<div/>)
                            }
                        </Nav>
                        <Nav>
                            {currentUser ? (
                                <>
                                    <LinkContainer to={"/profile/" + currentUser.uid}>
                                        <button className="btn btn-primary" type="submit">Profile</button>
                                    </LinkContainer>
                                    <button className="btn btn-primary" onClick={() => handleLogout()}
                                            type="submit">Sign-out
                                    </button>
                                </>
                            ) : (<LinkContainer to="/login">
                                <button className="btn btn-primary" type="submit">Sign-up</button>
                            </LinkContainer>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}