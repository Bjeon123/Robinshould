import React from 'react'
import { Link } from 'react-router-dom';


const SplashHeader = () =>(
    <nav className='splash-header'>
        <div className='left-splash-header'>
            <img width="40%" src={window.logo}/>
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