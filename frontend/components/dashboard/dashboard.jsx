import React from 'react';
import NavBar from './nav_bar_container'
import Porfolio from './portfolio_container'
import Watchlists from './watchlists';
import BuyingPower from './buying_power';
import News from './news'
import BuyinPowerForm from '../modal/buying_power_container'
import Modal from '../modal/modal'

class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showModal: false
        }
        this.logout = this.logout.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    logout(){
        delete window.currentUser
        this.props.logout();
    }

    closeModal(){
        this.setState({showModal: false})
    }

    showModal(e){
        e.stopPropagation();
        this.setState({showModal: true})
    }


    render(){
        return (
            <div className= "dashboard-container">
                {this.state.showModal ?
                    <Modal close={this.closeModal} className="watchlist-modal" show={this.state.showModal} component={<BuyinPowerForm/>} comp={"buying-power-form"}/> 
                    : null
                }
                <NavBar/>
                <div className="dashboard">
                    <div className="dashboard-left">
                        <Porfolio user={this.props.user} holdings={this.props.user.holdings} />
                        <BuyingPower showModal={this.showModal}/>   
                        <News/>
                    </div>
                    <Watchlists/>
                </div>
            </div>
        )
    }
}

export default DashBoard