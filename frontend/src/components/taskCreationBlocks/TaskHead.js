import React, {useEffect, useState} from "react";
import {Form, Stack} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./TaskHead.css"
import axios from "axios";
import {API_BASE_URL} from "../../constants";
import {getAuth} from "firebase/auth";
import firebase from "../../config/FirebaseConfig";
import {useAlert} from "react-alert";

const auth = getAuth(firebase);

export default function TaskHead({getTitle, getTheme, getTags}) {
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("");
    const [multiSelections, setMultiSelections] = useState([]);
    const [tagOptions, setTagOptions] = useState([])
    const [themeOptions, setThemeOptions] = useState([])
    const alert = useAlert()
    useEffect(() => {
        getTitle(title)
    }, [getTitle, title])
    useEffect(() => {
        getTheme(theme)
    }, [theme, getTheme])
    useEffect(() => {
        getTags(multiSelections)
    }, [getTags, multiSelections])
    useEffect(() => {
        async function fetchData() {
            await auth.currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get(API_BASE_URL + "/task/getAllTagNames", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    }
                })
                    .then(response => {
                        setTagOptions(response.data)
                    }).catch((error) => {
                        alert.show("No access!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
                await axios.get(API_BASE_URL + "/task/getAllThemes", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    }
                })
                    .then(response => {
                        setThemeOptions(response.data)
                        setTheme(response.data[0])
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

    }, [alert]);
    const Select = ({value, options, onChange}) => {
        return (
            <Form.Select required value={value} onChange={onChange}>
                {options.map(option => {
                    return (<option key={option} value={option}>{option}</option>);
                })}
            </Form.Select>
        );
    };
    return (
        <Stack gap={3} className="container mt-2 mx-auto">
            <Form.Group>
                <Form.Label><h4>Choose title</h4></Form.Label>
                <Form.Control required
                              type="text"
                              placeholder="Choose a title..."
                              value={title}
                              onChange={event => {
                                  setTitle(event.target.value)
                              }}
                />
                <Form.Control.Feedback type="invalid">
                    Please choose a title.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label><h4>Chose theme</h4></Form.Label>
                <Select value={theme} options={themeOptions} onChange={event => {
                    setTheme(event.target.value)
                }}/>
                <Form.Control.Feedback type="invalid">Please choose a theme.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label><h4>Choose tags</h4></Form.Label>
                <Typeahead
                    clearButton
                    allowNew
                    id="tags"
                    labelKey="name"
                    multiple
                    onChange={setMultiSelections}
                    options={tagOptions}
                    placeholder="Choose tags..."
                    selected={multiSelections}
                />
            </Form.Group>
        </Stack>
    );
}