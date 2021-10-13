import React from 'react';
import NaviBar from "./components/NaviBar";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Home} from "./components/Home";
import {Admin} from "./components/Admin";
import {Login} from "./components/Login";
import {AuthProvider} from "./service/Auth";
import Profile from "./components/Profile";
import {TaskCreation} from "./components/TaskCreation";
import Task from "./components/Task";
import PrivateRoute from "./common/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <NaviBar/>
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute exact path="/admin" component={Admin}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/createTask" component={TaskCreation}/>
                    <Route exact path="/profile/:uid" component={Profile}/>
                    <Route exact path="/task/:taskId" component={Task}/>
                </Switch>
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
