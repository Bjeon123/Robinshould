import React from 'react'
import {editCurrentUser} from '../../actions/users_actions'
import {connect} from 'react-redux'
import { numToMoney } from '../../util/numbers_api.util'


class BuyingPower extends React.Component{
    constructor(props){
        super(props)
        this.state={
            opened: false,
            modalOpened: false
        }
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({opened: !this.state.opened})
    }

    render(){
        return(
            <div onClick={this.handleClick} className = {this.state.opened === false ? "buying-power" : "buying-power-detailed"}>
                <div className="buying-power-title">
                    <h1>Buying Power</h1>
                    <h1>{numToMoney.format(this.props.user.total_capital)}</h1>
                </div>
                {this.state.opened === true ?
                    <div>
                        <button className="add_fund_button">Deposit Funds</button> 
                    </div> : 
                    <div></div>
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

