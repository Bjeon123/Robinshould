import React from 'react';
import DashNav from './dashboard_nav'
import Porfolio from './portfolio_container'
import Watchlists from './watchlists';
import BuyingPower from './buying_power';
import News from './news'

class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
        this.state={
            windowClick: false
        }
    }

    logout(){
        delete window.currentUser
        this.props.logout();
    }

    handleWindowClick(e){
        if(e.target.className !== "stock-row"){
            this.setState({windowClick: true})
        }
    }

    render(){
        return (
            <div onClick={(e)=>this.handleWindowClick(e)} className= "dashboard-container">
                <DashNav user={this.props.user} logout={this.props.logout} />
                <div className="dashboard">
                    <div className="dashboard-left">
                        <Porfolio user={this.props.user} holdings={this.props.user.holdings} />
                        <BuyingPower/>   
                        <News/>
                    </div>
                    <Watchlists/>
                </div>
            </div>
        )
    }
}

export default DashBoard