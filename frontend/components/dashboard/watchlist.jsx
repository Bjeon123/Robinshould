import React from 'react'
import WatchlistItem from './watchlistCard'


class Watchlist extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            opened: false,
            chervonSymbol: "fas fa-chevron-up"
        }
    }

    render(){
        const watchListCards = this.props.watchlist.stocks.map((stock, index) => {
            return <WatchlistItem key={`${stock.ticker}${index}`} stock={stock} />
        })
        const nextClass = this.state.chervonSymbol === "fas fa-chevron-up" ? "fas fa-chevron-down" : "fas fa-chevron-up"
        return(
            <div>
                <div className="watchlist-title">
                    <h3>{this.props.watchlist.name}</h3>
                    <div>
                        <i id={this.props.watchlist.id} onClick={(e) => this.props.handleClick(e)} className="far fa-trash-alt"></i>
                        <i onClick={() => this.setState({ opened: !this.state.opened, chervonSymbol: nextClass})} className={this.state.chervonSymbol}></i>
                    </div>
                </div>
                <ul>
                    {this.state.opened ? watchListCards : null}
                </ul>
            </div>
        )
    }

}

export default Watchlist