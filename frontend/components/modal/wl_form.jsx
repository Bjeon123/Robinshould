import React from 'react'
class WLForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            money: "",
            user_id: ""
        }
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick(){
        const updatedUser = {
            id: this.props.currentUser.id,
            first_name: this.props.currentUser.first_name,
            last_name: this.props.currentUser.last_name,
            total_capital: this.props.currentUser.total_capital + parseFloat(this.state.money)
        } 
        this.props.editCurrentUser(updatedUser)
    }

    render(){
        console.log(this.props)
        return(
            <form className="buying-power-form">
                <div className="bp-row">
                    <p>From</p>
                    <p>Unlimited Money Bank Account</p>
                </div>
                <div className="bp-row"> 
                    <p>Amount</p>
                    <input onChange={(e)=>this.setState({money: e.target.value})} type="text"/>
                </div>
                <div className = "bp-row">
                    <button onClick={this.handleClick}>Review</button>
                </div>
            </form>
        )
    }
}

export default WLForm