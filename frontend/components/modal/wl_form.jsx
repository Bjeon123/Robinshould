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
            <form className="wlform">
                <div>
                    <p>From</p>
                    <select> 
                        <option>Unlimited Money Bank Account</option>
                    </select>
                </div>
                <label>Amount
                    <input onChange={(e)=>this.setState({money: e.target.value})} type="text"/>
                </label>
                <button onClick={this.handleClick}>Review</button>
            </form>
        )
    }
}

export default WLForm