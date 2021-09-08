import React from 'react'
import SplashHeader from './splash_header' 
import { Link } from 'react-router-dom';
import splashVideo from '../../images/changeLater.png'
import Pic from '../../images/pic.png'

const Spash = (props) =>{
    return(
        <div>
            <SplashHeader></SplashHeader>
            <img width="100%" src={splashVideo} />
            <img width="100%" src={Pic} />
        </div>
    )
}

export default Spash