import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import splashVideo from '../../images/changeLater.png'


const SplashHeader = () =>(
    <nav className='splash-header'>
        <div className='left-splash-header'>
            <img width="40%" src={logo}/>
        </div>
        <div className='right-splash-header'>
            <Link to={"/login"}>
                <button className="login-button">Log in</button>
            </Link>
            <Link to={"/signup"}>
                <button className="signin-button">Sign Up</button>
            </Link>
        </div>
    </nav>
)

export default SplashHeader