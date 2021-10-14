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

    handleClick(e){
        // e.preventDefault()
        // this.props.createWatchList(this.state);
        // this.props.closeModal();
    }

    render(){
        return(
            <form className="wlform">
                <div>
                    <p>From</p>
                    <select> 
                        <option onClick={(e)=>{e.stopPropagation()}}>Unlimited Money Bank Account</option>
                    </select>
                </div>
                <label>Amount
                    <input onChange={(e)=>this.setState({money: e.target.value})} type="text"/>
                </label>
                <button >Review</button>
            </form>
        )
    }
}

export default WLForm