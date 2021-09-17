import React from 'react'
class WLForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: "",
            user_id: this.props.user.id
        }
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick(e){
        e.preventDefault()
        this.props.createWatchList(this.state);
        this.props.closeModal();
    }

    render(){
        return(
            <form className="wlform">
                <label>Name
                    <input onChange={(e)=>this.setState({name: e.target.value})} type="text"/>
                </label>
                <button onClick={this.handleClick}>Create List</button>
            </form>
        )
    }
}

export default WLForm