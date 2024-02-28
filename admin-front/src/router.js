import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage.js';
import LogIn from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import ChangeUserInfo from './pages/changeuserinfo.js';

// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Homepage}></Route>
                    <Route path='/login' exact component={LogIn}></Route>
                    <Route path='/dashboard' exact component={Dashboard}></Route>
                    <Route path='/dashboard/changeuserinfo' exact component={ChangeUserInfo}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;