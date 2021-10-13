import React, {useContext, useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import {useAlert} from "react-alert";
import {AuthContext} from "../../service/Auth";
import {useHistory} from "react-router-dom";

export default function TasksTable(uid) {
    let history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const alert = useAlert()
    const columns = [
        {
            dataField: "id",
            text: "Task id",
            sort: true
        },
        {
            dataField: "title",
            text: "Title",
            sort: true
        },
        {
            dataField: "theme",
            text: "Theme",
            sort: true
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
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            history.push('/task/' + row.id)
        }
    }

    return (
        <div>
            {!!data.length ?
                (<div className="container" style={{marginTop: 50}}>
                    <BootstrapTable
                        striped
                        hover
                        keyField='id'
                        data={data}
                        columns={columns}
                        rowEvents={rowEvents}/>
                </div>)
                : <div/>}
        </div>
    );
}

