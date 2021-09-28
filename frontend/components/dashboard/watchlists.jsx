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
            prevsize: null,
            watchlists: null
        }
        this.closeModal=this.closeModal.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }

    componentDidMount(){
        this.props.fetchWatchlists().then(
           (watchlists) => this.setState({watchlists: watchlists})
        )
    }

    handleClick(e){
        this.props.deleteWatchlist(parseInt(e.target.id))
    }

    closeModal(){
        this.setState({showModal: false})
    }

    render(){
        if (this.state.watchlists=== null || Object.keys(this.props.user).length==0){            
            return null;
        }
        console.log(this.state)
        const watchlistForm = <WLForm createWatchList={this.props.createNewWatchlist} closeModal={this.closeModal} user={this.props.user} />
        const { holdings } = this.props.user;
        const watchlists = this.props.watchlists;
        const holdingElements = Object.values(holdings).map(
            (holding,index) => <WatchListCard key={`${holding.ticker_id}${index}`} holding = {holding}/>
        )
        const watchlistsArr = Object.values(watchlists)

        const watchlistsElements = watchlistsArr.map((watchlist,index) => {
            return <Watchlist watchlist={watchlist} key={`${index}`} handleClick={this.handleClick}/>
        })

        return(
            <div className="watchlist-container">
                <Modal close={this.closeModal} className="wl-modal" comp={"wlform"} show={this.state.showModal} component={watchlistForm} />
                <div id="wl-stock-title-container">
                    <h3 id="wl-stock-title">Stocks</h3>
                </div>
                {holdingElements}
                <div id="wl-list-title-container" className="watchlists-title">
                    <h3 id="wl-list-title">Lists</h3>
                    <button className="add_list_btn" onClick={() => { this.setState({ showModal: true }) }}>+</button>
                </div>
                {watchlistsElements}
            </div>
        )
    }
}

const mSTP= state=>(
    {
        user: state.user,
        watchlists: state.watchlists
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