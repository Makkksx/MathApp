import React, {useContext, useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import {useAlert} from "react-alert";
import {AuthContext} from "../../service/Auth";
import {useHistory} from "react-router-dom";
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {Button, Modal} from "react-bootstrap";

export default function TasksTable(uid) {
    let history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const alert = useAlert()
    const [showDanger, setShowDanger] = useState(false);
    const columns = [
        {
            dataField: "id",
            text: "Task id",
            sort: true
        },
        {
            dataField: "title",
            text: "Title",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "theme",
            text: "Theme",
            sort: true,
            filter: textFilter()
        }
    ];
    useEffect(() => {
        async function fetchData() {
            await currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get("/task/getUserTasks", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                    params: {
                        uid: uid.uid
                    },
                })
                    .then(response => {
                        setData(response.data);
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

    }, [uid, alert, currentUser]);

    const expandRow = {
        renderer: row => (
            <div>
                <Button className={"mx-1"}>Edit</Button>
                <Button className={"mx-1"} onClick={() => history.push('/task/' + row.id)}>View</Button>
                <Button variant="danger" className={"mx-1"} onClick={()=>setShowDanger(true)}>Delete</Button>
                <Modal show={showDanger} onHide={() => setShowDanger(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the task?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDanger(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => setShowDanger(false)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        ),
    };
    return (
        <div>
            {!!data.length ?
                (<div className="container mt-5">
                    <BootstrapTable
                        striped
                        hover
                        keyField='id'
                        data={data}
                        columns={columns}
                        // rowEvents={rowEvents}
                        filter={filterFactory()}
                        expandRow={expandRow}
                        pagination={paginationFactory({sizePerPage: 5, hideSizePerPage: true})}/>
                </div>)
                : <div/>}
        </div>
    );
}

