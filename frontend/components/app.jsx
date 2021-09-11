import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import Splash from './splash/splash_container';
import LogInForm from './sessions/login_form_container'
import SignUpForm from './sessions/signup_form_container'
import Dashboard from './dashboard/dashboard_container'
import { AuthRoute, ProtectedRoute } from '../util/auth_api_util';
import Stock from './stocks/stock_container'

const App = () =>(
    <div>
        <AuthRoute exact path="/" component={Splash}/>
        <AuthRoute exact path="/login" component={LogInForm}/>
        <AuthRoute exact path="/signup" component={SignUpForm}/>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/stocks/:ticker" component={Stock} />
    </div>
)

export default App;
