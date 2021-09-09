import React from 'react'

const dashboardNav =(props)=>{
    return(
        <nav className="dash-nav">
            <div className="dash-nav-left">
                <img className="tree" src={window.tree} width="4%"/>
                <input className="search" type="text" placeholder="Search" />
            </div>
            <div className="dash-nav-right">
                <button>Portfolio</button>
                <button>Cash</button>
                <button>Account</button>
            </div>
            
        </nav>
    )
}

export default dashboardNav