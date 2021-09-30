import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {API_BASE_URL} from "../constants";
import axios from "axios";
import {getAuth} from "firebase/auth";
import firebase from "../config/FirebaseConfig";

const auth = getAuth(firebase);
class UsersTable extends Component {
        state = {
        data: [],
        columns: [
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
        ],
        rowEvents: {
            onClick: (e, row, rowIndex) => {
                console.log(row)
                window.location.href = '/profile/' + row.uid
            }
        }

    }

    componentDidMount() {
        auth.currentUser.getIdToken(true).then((idToken) => {
            axios.get(API_BASE_URL + "/admin/getAll", {
                headers: {
                    "Content-Type": "application/json",
                    idToken: idToken,
                },
            })
                .then(response => {
                    this.setState({
                        data: response.data
                    });
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) =>{
            console.log(error)
        });
        }

    render() {
        return (
            <div className="container" style={{marginTop: 50}}>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={this.state.data}
                    columns={this.state.columns}
                    rowEvents={this.state.rowEvents}/>
            </div>
        );
    }
}

export default UsersTable;


