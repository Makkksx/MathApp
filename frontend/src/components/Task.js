import React, {useCallback, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import DropPlace from "./taskBlocks/DropPlace";
import TaskCondition from "./taskBlocks/TaskCondition";
import {AuthContext} from "../service/auth";
import {useAlert} from "react-alert";
import TaskHead from "./taskBlocks/TaskHead";
import TaskAnswer from "./taskBlocks/TaskAnswer";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import firebase from "../config/FirebaseConfig";
import {getAuth} from "firebase/auth";
import axios from "axios";
import {API_BASE_URL} from "../constants";

const auth = getAuth(firebase);

const storage = getStorage();
export const Task = () => {
    const date = new Date().getTime();
    const {currentUser} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("");
    const [tags, setTags] = useState(null)
    const [condition, setCondition] = useState(null)
    const [images, setImages] = useState(null)
    const [answer, setAnswer] = useState([]);
    const [validated, setValidated] = useState(false);
    const alert = useAlert()
    const getTitle = useCallback((title) => {
        setTitle(title)
    }, []);
    const getTheme = useCallback((theme) => {
        setTheme(theme)
    }, []);
    const getTags = useCallback((tags) => {
        setTags(tags)
    }, []);
    const getCondition = useCallback((condition) => {
        setCondition(condition)
    }, []);
    const getAnswer = useCallback((answer) => {
        setAnswer(answer)
    }, []);
    const getImages = useCallback((images) => {
        setImages(images)
    }, []);
    const uploadFiles = (type, file) =>
        new Promise((resolve, reject) => {
            const uploadRef = ref(storage, `/${currentUser.uid}/${type}/${file.name}`);
            const uploadTask = uploadBytesResumable(uploadRef, file);
            // const task = firebase.storage().ref(pathToName).put(file);
            const taskProgress = () => {
            };
            const taskError = reject;
            const taskCompleted = () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(resolve)
                    .catch(reject);
            };
            uploadTask.on("state_changed", taskProgress, taskError, taskCompleted);
        });
    // async function uploadFiles(type, file) {
    //     const uploadRef = ref(storage, `/${currentUser.uid}/${type}/${file.name}`);
    //     const uploadTask = uploadBytesResumable(uploadRef, file);
    //     return await getDownloadURL(uploadTask.snapshot.ref)
    // }

    async function uploadData() {
        const imagesUrls = [];
        let conditionUrl = null;
        const tagsDto = [];
        const answersDto = [];
        for (const image of images) {
            await uploadFiles("Images", image).then((url) => {
                imagesUrls.push(url)
            })
        }
        const file = new File([condition], `${date}.md`, {
            type: "text/markdown",
        });
        await uploadFiles("Conditions", file).then((url) => {
            conditionUrl = url;
        });
        tags.forEach(elm => {
            if (elm.substring) {
                tagsDto.push(elm)
            } else {
                tagsDto.push(elm.name)
            }
        })
        answer.forEach(elm => {
            answersDto.push(elm.answer)
        })
        const taskDto = {
            title: title,
            theme: theme,
            tags: tagsDto,
            conditionURL: conditionUrl,
            images: imagesUrls,
            answers: answersDto
        };
        console.log(taskDto);
        await auth.currentUser.getIdToken(true).then((idToken) => {
            axios.post(API_BASE_URL + "/task/create", taskDto, {
                headers: {
                    "Content-Type": "application/json",
                    idToken: idToken,
                },
            }).then(() => {
                window.location.href = '/home'
                alert.show("Successfully created!", {timeout: 2000, type: 'error'})
            }).catch((error) => {
                alert.show("No access!", {timeout: 2000, type: 'error'})
                console.log(error)
            });
        }).catch((error) => {
            alert.show("Bad token", {timeout: 2000, type: 'error'})
            console.log(error)
        });
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            setValidated(true);
            event.stopPropagation();
        } else {
            console.log("go")
            await uploadData();
        }
    }
    return (
        <Form className="col-md-6 mt-2 mx-auto" noValidate validated={validated} onSubmit={handleSubmit}>
            <h2 className={"text-center"}>Create new task</h2>
            <TaskHead getTitle={getTitle}
                      getTheme={getTheme}
                      getTags={getTags}/>
            <TaskCondition getCondition={getCondition}/>
            <TaskAnswer getAnswer={getAnswer}/>
            <DropPlace getImages={getImages}/>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">Create</Button>
            </div>
        </Form>
    )
}