import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingPage = () => {
    return(
        <div className="loading-page"><Loader type="ThreeDots" color="#00c805" /></div>
    )
}


export default LoadingPage;