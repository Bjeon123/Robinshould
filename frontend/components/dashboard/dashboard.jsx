import React from 'react';
import DashNav from './dashboard_nav'
import Porfolio from './portfolio'

class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(){
        delete window.currentUser
        this.props.logout();
    }

    render(){
        return (
            <div className="dashboard">
                <DashNav></DashNav>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default DashBoard