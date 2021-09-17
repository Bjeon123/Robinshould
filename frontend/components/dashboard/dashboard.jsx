import React from 'react';
import DashNav from './dashboard_nav'
import Porfolio from './portfolio_container'
import Watchlists from './watchlists';
import BuyingPower from './buying_power';

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
            <div className= "dashboard-container">
                <DashNav user={this.props.user} logout={this.props.logout}/>
                <div className="dashboard">
                    <div className="dashboard-left">
                        <Porfolio user={this.props.user} holdings={this.props.user.holdings} />
                        <BuyingPower/>
                    </div>
                    <Watchlists/>
                </div>
            </div>
        )
    }
}

export default DashBoard