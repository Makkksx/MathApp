import React, {useContext, useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import {useAlert} from "react-alert";
import {AuthContext} from "../../service/Auth";
import {useHistory} from "react-router-dom";

export default function UsersTable() {
    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const alert = useAlert()
    let history = useHistory();
    const columns = [
        {
            dataField: "uid",
            text: "ID",
            sort: true
        },
        {
            dataField: "username",
            text: "Name",
            sort: true
        },
        {
            dataField: "email",
            text: "Email",
            sort: true
        },
        {
            dataField: "provider",
            text: "Provider",
            sort: true
        },
    ];
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            history.push('/profile/' + row.uid)
        }
    }

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get("/admin/getAll", {
                    headers: {
                        "Content-Type": "application/json",
                        idToken: idToken,
                    },
                })
                    .then(response => {
                        setData(response.data);
                    }).catch((error) => {
                        alert.show("You are not an admin!", {timeout: 2000, type: 'error'})
                        console.log(error);
                    });
            }).catch((error) => {
                alert.show("No access!", {timeout: 2000, type: 'error'})
                console.log(error)
            });
        } else {
            alert.show("Please login to view", {timeout: 2000, type: 'error'})
        }
    }, [alert, currentUser]);

    return (
        <div className="container" style={{marginTop: 50}}>
            <BootstrapTable
                striped
                hover
                keyField='id'
                data={data}
                columns={columns}
                rowEvents={rowEvents}/>
        </div>
    );
}

