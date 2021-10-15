import React, {useContext, useEffect, useMemo, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import {useAlert} from "react-alert";
import {AuthContext} from "../../service/Auth";
import {useHistory} from "react-router-dom";
import {Pagination} from "react-bootstrap";

let PageSize = 5;
export default function UsersTable() {
    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data]);
    let items = [];
    for (let number = 1; number <= (data.length / PageSize | 0); number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage}
                             onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <div className="container" style={{marginTop: 50}}>
            <BootstrapTable
                striped
                hover
                keyField='id'
                data={currentTableData}
                columns={columns}
                rowEvents={rowEvents}/>
            <Pagination>{items}</Pagination>
        </div>
    );
}

