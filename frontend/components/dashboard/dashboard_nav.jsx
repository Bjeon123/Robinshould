import React from 'react'
import tree from '../../images/tree.png'
import greenTree from '../../images/greenTree.png'

const dashboardNav =(props)=>{
    return(
        <nav className="dash-nav">
            <div className="dash-nav-left">
                <img className="tree" width="4%" src={tree}/>
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