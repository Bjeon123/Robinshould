import React from 'react'
import WatchListCard from './watchlistCard.jsx'
import Modal from '../modal/modal'
import WLForm from '../modal/wl_form'
import Watchlist from './watchlist'
import { fetchWatchlists, createNewWatchlist, deleteWatchlist } from '../../actions/watchlist_actions'
import { getCurrentUser } from '../../actions/users_actions'
import {connect} from 'react-redux'

class Watchlists extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentUser: window.currentUser,
            showModal: false,
            addListForm: false,
            newWLName: "",
            prevsize: null,
            watchlists: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.cancelNewWL = this.cancelNewWL.bind(this)
        this.handleNewWL = this.handleNewWL.bind(this)
    }

    componentDidMount(){
        this.props.fetchWatchlists().then(
           (watchlists) => this.setState({watchlists: watchlists})
        )
    }

    handleNewWL(){
        const watchlist ={
            name: this.state.newWLName,
            user_id: this.props.user.id
        }
        this.props.createNewWatchlist(watchlist).then(
            this.setState({addListForm: false, newWLName:""})
        )
    }

    handleClick(e){
        this.props.deleteWatchlist(parseInt(e.target.id))
    }

    cancelNewWL(){
        this.setState({addListForm: false, newWLName:""})
    }

    render(){
        if (this.state.watchlists=== null || Object.keys(this.props.user).length==0){            
            return null;
        }
        // const watchlistForm = <WLForm createWatchList={this.props.createNewWatchlist} closeModal={this.closeModal} user={this.props.user} />
        const { holdings } = this.props.user;
        const watchlists = this.props.watchlists;
        const holdingElements = Object.values(holdings).map(
            (holding,index) => <WatchListCard key={`${holding.ticker_id}${index}`} holding = {holding}/>
        )
        const watchlistsArr = Object.values(watchlists)
        const newWLForm = 
        <div className="new-wl-form">
            <input onChange= {(e)=>this.setState({newWLName: e.target.value})} type="text" placeholder="List Name" value={this.state.newWLName}/>
            <div className="wl-form-btns">
                <button id="cancel-wl-btn" onClick={this.cancelNewWL}>Cancel</button>
                <button id="create-wl-btn" onClick={this.handleNewWL}>Create List</button>
            </div>
        </div>
        const watchlistsElements = watchlistsArr.map((watchlist,index) => {
            return <Watchlist theme={this.props.theme} watchlist={watchlist} key={`${index}`} handleClick={this.handleClick}/>
        })
        return(
            <div className={`watchlist-container ${this.props.theme}`}>
                <div id="wl-stock-title-container">
                    <h3 id="wl-stock-title">Stocks</h3>
                </div>
                {holdingElements}
                <div id="wl-list-title-container" className="watchlists-title">
                    <h3 id="wl-list-title">Lists</h3>
                    <button className={`add_list_btn ${this.props.theme}`} onClick={() => { this.setState({ addListForm: true }) }}>+</button>
                </div>
                {this.state.addListForm ? newWLForm : null }
                {watchlistsElements}
            </div>
        )
    }
}

const mSTP= state=>(
    {
        user: state.user,
        watchlists: state.watchlists,
        theme: state.theme
    }
)

const mDTP = dispatch =>(
    {
        getCurrentUser: (user_id) => dispatch(getCurrentUser(user_id)),
        fetchWatchlists: () => dispatch(fetchWatchlists()),
        createNewWatchlist: (watchlist)=>dispatch(createNewWatchlist(watchlist)),
        deleteWatchlist: (watchlistId) =>dispatch(deleteWatchlist(watchlistId))
    }
)

export default connect(mSTP,mDTP)(Watchlists);