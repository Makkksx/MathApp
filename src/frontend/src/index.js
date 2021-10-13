import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from "react-router-dom";
import {Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

ReactDOM.render(
    <AlertProvider template={AlertTemplate}>
    <HashRouter>
        <App/>,
    </HashRouter>
    </AlertProvider>,
    document.getElementById('root')
);

reportWebVitals();