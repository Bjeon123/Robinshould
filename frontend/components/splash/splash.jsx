import React from 'react'
import SplashHeader from './splash_header' 
import { Link } from 'react-router-dom';

const Splash = (props) =>{
    return(
        <div className="splash" >
            <SplashHeader></SplashHeader>
            <div className="first-splash-component">
                <div className="splash-app-description">
                    <div>
                        <h1>Investing for</h1>
                        <h1>Everyone</h1>
                    </div>
                    <div>
                        <h3 className="description">Robinshould is a clone of the the investment website called Robinhood, a website that allows people to trade stocks and other financial instruments with no commission costs. Below are the technologies that I used to create this Application.</h3>
                    </div>
                    <Link to={"/signup"}>
                        <button className="signin-button">Sign Up</button>
                    </Link>
                </div>
                <img src={window.phone} />
            </div>
            <div className="second-splash-component">
                <img src={window.coolBalloon}/>
                <div className="technologies">
                    <h1>Technologies Used</h1>
                    <h2>React</h2>
                    <img className="tech-logos" width="60px" src={window.react}/>
                    <h2>Redux</h2>
                    <img className="tech-logos" width="60px" src={window.redux} />
                    <h2>Ruby</h2>
                    <img className="tech-logos" width="60px" src={window.ruby} />
                    <h2>Rails</h2>
                    <img className="tech-logos" width="60px" src={window.rails} />
                    <h2>PostgreSql</h2>
                    <img className="tech-logos" width="60px" src={window.postgres} />
                </div>
            </div>
            <div className="splash-footer">
                <div>
                    <h1>Links</h1>
                    <a href="https://github.com/Bjeon123"><h2>Github</h2></a>
                    <a href="https://www.linkedin.com/in/byung-jeon-01a68812a/"><h2>LinkedIn</h2></a>
                </div>
                <div>
                    <h1>Contact Me</h1>
                    <h2>SamuelJeon99@gmail.com</h2>
                    <h2>718-873-5445</h2>
                </div>
            </div>
        </div>
    )
}

export default Splash