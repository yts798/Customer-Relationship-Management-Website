import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage.js';
import LogIn from './pages/login.js';
import Register from './pages/register.js';
import Dashboard from './pages/dashboard.js';
import Contact from './pages/contact.js';
import Search from './pages/search.js';
import ChangeInfo from './pages/changeinfo';
import ChangePassword from './pages/changepassword.js';
import RegisterFillInfo from './pages/registerFillInfo.js';


// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Homepage}></Route>
                    <Route path='/login' exact component={LogIn}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/dashboard' exact component={Dashboard}></Route>
                    <Route path='/dashboard/contact' exact component={Contact}></Route>
                    <Route path='/dashboard/search' exact component={Search}></Route>
                    <Route path='/dashboard/changeinfo' exact component={ChangeInfo}></Route>
                    <Route path='/dashboard/changepassword' exact component={ChangePassword}></Route>
                    <Route path='/register/fillInfo' exact component={RegisterFillInfo}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;