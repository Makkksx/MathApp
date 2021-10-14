import React, {useCallback, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import DropPlace from "./taskCreationBlocks/DropPlace";
import TaskCondition from "./taskCreationBlocks/TaskCondition";
import {AuthContext} from "../service/Auth";
import {useAlert} from "react-alert";
import TaskHead from "./taskCreationBlocks/TaskHead";
import TaskAnswer from "./taskCreationBlocks/TaskAnswer";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import axios from "axios";
import {useHistory} from "react-router-dom";

const storage = getStorage();
export const TaskCreation = () => {
    let history = useHistory();
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
        await currentUser.getIdToken(true).then((idToken) => {
            axios.post("/task/create", taskDto, {
                headers: {
                    "Content-Type": "application/json",
                    idToken: idToken,
                },
            }).then(() => {
                history.push('/home')
                alert.show("Successfully created!", {timeout: 2000, type: 'success'})
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