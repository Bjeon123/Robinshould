import {addStockToWatchlist, removeStockFromWatchlist} from '../../util/watchlists_api_util'
import React from 'react'
class WatchlistForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const { stockId, watchlists} = this.props;
        let watchlistsArr = Object.values(watchlists)
        for (let i = 0; i < watchlistsArr.length; i++) {
            let pushed= false;
            for (let j = 0; j < watchlistsArr[i].stocks.length; j++) {
                if (watchlistsArr[i].stocks[j].id === stockId) {
                    pushed = true
                    this.setState({ [watchlistsArr[i].id]: [`fas fa-check checked ${this.props.theme}`,false] })
                    break;
                }
            }
            if (pushed === false) {
                this.setState({ [watchlistsArr[i].id]: [`fas fa-check ${this.props.theme}`, false] })
            }
        }
    }

    handleClick(e){
        const nextClass = e.target.className === `fas fa-check checked ${this.props.theme}` ? `fas fa-check ${this.props.theme}` : `fas fa-check checked ${this.props.theme}` ;
        const wlid = parseInt(e.target.id)
        const changed = !this.state[wlid][1]
        this.setState({[wlid]: [nextClass,changed]})
    }

    handleSubmit(){
        for(const wlid in this.state){
            if(this.state[wlid][1]==true){
                if (this.state[wlid][0] === `fas fa-check checked ${this.props.theme}`){
                    addStockToWatchlist(
                        {
                            watchlist_id: wlid,
                            stock_id: this.props.stockId
                        }
                    ).then(
                        ()=>this.props.fetchWatchlists()
                    )
                }
                else{
                    for(let i=0;i<this.props.watchlists[wlid].watchlist_joins.length;i++){
                        if (this.props.watchlists[wlid].watchlist_joins[i].stock_id===this.props.stockId){
                            removeStockFromWatchlist(this.props.watchlists[wlid].watchlist_joins[i].id).then(
                                () => this.props.fetchWatchlists()
                            )
                        }
                    }
                }
            }
        }
        this.props.closeModal()
    }

    render(){
        if (Object.keys(this.state).length === 0) {
            return null;
        }
        const{stockId,watchlists,ticker} = this.props;
        let components=[];
        let watchlistsArr = Object.values(watchlists)
        for(let i=0;i< watchlistsArr.length;i++){
            let pushed=false
            for(let j=0;j<watchlistsArr[i].stocks.length;j++){
                if(watchlistsArr[i].stocks[j].id === stockId){
                    pushed=true
                    components.push(
                        <div className="watchlist-form-row">
                            <i onClick={this.handleClick} id={watchlistsArr[i].id} className={`${this.state[watchlistsArr[i].id][0]}`}></i>
                            <p>{watchlistsArr[i].name}</p>
                        </div>
                    )
                    break;
                }
            }
            if(pushed===false){
                components.push(
                    <div className="watchlist-form-row">
                        <i onClick={this.handleClick} id={watchlistsArr[i].id} className={`${this.state[watchlistsArr[i].id][0]}`}></i>
                        <p>{watchlistsArr[i].name}</p>
                    </div>
                )
            }
        }
        return(
            <div className="wl-form-container">
                <div className="watchlist-form">
                    <div className="wl-form-title">
                        <h1>{`Add ${ticker} to Your Lists`}</h1>
                        <i onClick={this.props.closeModal} className="fas fa-times"></i>
                    </div>
                    {components}
                    <button onClick={this.handleSubmit} className={`watchlist-form-btn ${this.props.theme}`}>Save Changes</button>
                </div>
            </div>
        )
    }
}

export default WatchlistForm