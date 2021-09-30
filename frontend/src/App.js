import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./components/NaviBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./components/Home";
import {Admin} from "./components/Admin";
import Login from "./components/Login";
// import PrivateRoute from "./common/PrivateRoute";
import {AuthProvider} from "./service/auth";
import Profile from "./components/Profile";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NaviBar/>
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    {/*<PrivateRoute  exact path="/admin" component={Admin}/>*/}
                    <Route  exact path="/admin" component={Admin}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/profile/:uid" component={Profile}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
