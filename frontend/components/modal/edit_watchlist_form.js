import React from "react";
import watchlists from "../dashboard/watchlists";

class EditWatchListForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: this.props.name
        }
        this.editWatchlist=this.editWatchlist.bind(this)
    }

    editWatchlist(){
        let newWatchlist ={
            id: this.props.id,
            name: this.state.name
        }
        this.props.updateWatchlist(newWatchlist).then(
            ()=>this.props.closeModal()
        )
    }

    render(){
        return(
            <div>
                <div className="wl-form-container edit">
                    <div className="wl-form-title">
                        <p>Edit List</p>
                        <i onClick={this.props.closeModal} className="fas fa-times"></i>
                    </div>
                    <input className="wl-form-row" onChange={(e)=>this.setState({name: e.target.value})} type="text" value={this.state.name}/>
                    <button className="wl-form-row" onClick={this.editWatchlist}>Save</button>
                </div>
            </div>
        )
    }
}

export default EditWatchListForm;