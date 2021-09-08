import React from 'react'
import SplashHeader from './splash_header' 
import { Link } from 'react-router-dom';
import splashVideo from '../../images/changeLater.png'

const Spash = (props) =>{
    return(
        <div>
            <SplashHeader></SplashHeader>
            <img width="100%" src={splashVideo} />
        </div>
    )
}

export default Spash