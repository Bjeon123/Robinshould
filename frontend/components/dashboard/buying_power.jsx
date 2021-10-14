import React from 'react'
import {editCurrentUser} from '../../actions/users_actions'
import {connect} from 'react-redux'
import { numToMoney } from '../../util/numbers_api.util'
import WLForm from '../modal/wl_form'
import Modal from '../modal/modal'


class BuyingPower extends React.Component{
    constructor(props){
        super(props)
        this.state={
            detailed: false,
            showModal: false
        }
        this.handleClick= this.handleClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    handleClick(){
        this.setState({detailed: !this.state.detailed})
    }

    closeModal(){
        this.setState({showModal: false})
    }

    render(){
        return(
            <div onClick={this.handleClick} className = {this.state.detailed === false ? "buying-power" : "buying-power-detailed"}>
                {this.state.showModal ?
                    <Modal close={this.closeModal} className="watchlist-modal" show={this.state.showModal} component={<WLForm/>} comp={"watchlist-form"}/> 
                    : null
                }
                <div className="buying-power-title">
                    <h1>Buying Power</h1>
                    <h1>{numToMoney.format(this.props.user.total_capital)}</h1>
                </div>
                {this.state.detailed ?
                    <div>
                        <button onClick={()=>this.setState({showModal: true})} className="add_fund_button">Deposit Funds</button> 
                    </div> : 
                    null
                }
            </div>
        )
    }
}

const mSTP = state =>(
    {
        user: state.user
    }
)

const mDTP = dispatch =>(
    {
        editCurrentUser: (currentUser) => dispatch(editCurrentUser(currentUser))
    }
)

export default connect(mSTP,mDTP)(BuyingPower)

