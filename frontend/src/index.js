import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
import {BrowserRouter} from "react-router-dom";
import {Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

ReactDOM.render(
    <AlertProvider template={AlertTemplate}>
    <BrowserRouter>
        <App/>,
    </BrowserRouter>
    </AlertProvider>,
    document.getElementById('root')
);

reportWebVitals();