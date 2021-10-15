import React from 'react'
import {editCurrentUser} from '../../actions/users_actions'
import {connect} from 'react-redux'
import { numToMoney } from '../../util/numbers_api.util'


class BuyingPower extends React.Component{
    constructor(props){
        super(props)
        this.state={
            detailed: false,
        }
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({detailed: !this.state.detailed})
    }

    render(){
        const {detailed} = this.state
        return(
            <div onClick={this.handleClick} className = {detailed === false ? "buying-power" : "buying-power-detailed"}>
                <div className="buying-power-inner">
                    <div className={detailed === false ? "buying-power-title" : "buying-power-title detailed"} >
                        <h1>Buying Power</h1>
                        {detailed ? null : <h1>{numToMoney.format(this.props.user.total_capital)}</h1> }
                    </div>
                    {this.state.detailed ?
                        <div className="buying-power-detailed-inner">
                            <div className="buying-power-details">
                                <div className ="buying-power-row">
                                    <p>Instant Avaliable</p>
                                    <p>{numToMoney.format(this.props.user.total_capital)}</p>
                                </div>
                                <div className ="buying-power-row t-border">
                                    <p>Buying Power</p>
                                    <p>{numToMoney.format(this.props.user.total_capital)}</p>
                                </div>
                                <button onClick={(e)=>this.props.showModal(e)} className="add_fund_button">Deposit Funds</button> 
                            </div>
                            <div className ="buying-power-row-two">
                                <p>Buying Power represents the total value of assets you can purchase.</p>
                            </div>
                        </div> : 
                        null
                    }
                </div>
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

