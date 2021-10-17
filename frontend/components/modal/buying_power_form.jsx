import React from 'react'
import {numToMoney} from '../../util/numbers_api.util'
class BuyingPowerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            money: "",
            user_id: "",
            moneyFormatted: "",
        }
        this.handleClick= this.handleClick.bind(this)
        this.setMoney=this.setMoney.bind(this)
    }

    handleClick(){
        const money = this.state.money.replace('$ ', '')
        const updatedUser = {
            id: this.props.currentUser.id,
            first_name: this.props.currentUser.first_name,
            last_name: this.props.currentUser.last_name,
            total_capital: this.props.currentUser.total_capital + parseFloat(money)
        } 
        this.props.editCurrentUser(updatedUser).then(
            ()=> this.props.closeModal()
        )
    }

    setMoney(e){
        const money = e.target.value.replace('$ ', '')
        const validInput = parseFloat(money) > 0
        if(validInput){
            this.setState({money: `$ ${money}`})
        }
        else{
            this.setState({money: ""})
        }
    }

    render(){
        let moneyFormatted = parseFloat(this.state.money) > 0 ? numToMoney.format(parseFloat(this.state.money)) : "";
        console.log(this.state)
        return(
            <form className="buying-power-form">
                <div className="bp-row">
                    <h1>Deposit Funds</h1>
                </div>
                <div className="bp-row">
                    <p>From</p>
                    <div className="bp-input">
                        <p>JL Morgan Base</p>
                    </div>
                </div>
                <div className="bp-row"> 
                    <p>Amount</p>
                    <input className="bp-input" placeholder="$0.00" onChange={this.setMoney} type="text" value={this.state.money}/>
                </div>
                <div className = "bp-row">
                    <button className={`add_fund_button ${this.props.theme}`} onClick={this.handleClick}>Deposit Funds</button>
                </div>
            </form>
        )
    }
}

export default BuyingPowerForm