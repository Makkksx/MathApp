import React, {useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {API_BASE_URL} from "../constants";
import axios from "axios";
import {getAuth} from "firebase/auth";
import firebase from "../config/FirebaseConfig";
import {useAlert} from "react-alert";

const auth = getAuth(firebase);

export default function UsersTable() {
    const [data, setData] = useState([]);
    const alert = useAlert()
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
            console.log(row)
            window.location.href = '/profile/' + row.uid
        }
    }

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdToken(true).then(async (idToken) => {
                await axios.get(API_BASE_URL + "/admin/getAll", {
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
    }, [alert]);

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

