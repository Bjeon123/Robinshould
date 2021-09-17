import React from 'react'
import LineGraph from '../charts/line_graph'
import DashNav from '../dashboard/dashboard_nav'
import StockTransactionForm from './stock_transaction_form'
import ShareDetails from './share_details'
import Modal from '../modal/modal'
import WatchlistForm from '../modal/watchlist_form'

class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showModal: this.props.showModal
        }
        this.closeModal=this.closeModal.bind(this)
    }

    closeModal(){
        this.setState({showModal: false})
    }

    render(){
        const dataFormatType = this.props.data['intraday-prices'] ? 'intraday-prices' : 'chart'
        const watchlistForm = <WatchlistForm fetchWatchlists={this.props.fetchWatchlists} closeModal={this.closeModal} watchlists={this.props.watchlists} ticker={this.props.stock} stockId={this.props.stockId}/>
        let dataLastIdx = this.props.data[dataFormatType].length - 1;
        let refLine = this.props.data[dataFormatType][0]['close'].toFixed(2).toString();
        let currentPrice = this.props.data[dataFormatType][dataLastIdx]['close'].toFixed(2);
        let color = this.props.data[dataFormatType][0]['close'] < this.props.data[dataFormatType][dataLastIdx]['close'] ? "green" : "red";
        let dataHasTime = true;
        let showModal = false;
        if (this.props.timeframe == "3M" || this.props.timeframe == "1Y" || this.props.timeframe == "5Y") {
            dataHasTime = false;
        }
        let currentShares = null;
        for (const holdingId in this.props.currentUser.holdings) {
            if (this.props.currentUser.holdings[holdingId].ticker_id === this.props.stockId) {
                currentShares = this.props.currentUser.holdings[holdingId]
            }
        }
        let numShares = 0;
        if (currentShares) {
            numShares = currentShares.shares_bought
        }
        const sharesComponent = currentShares ? <ShareDetails shares={currentShares} currentPrice={currentPrice} openPrice={parseFloat(refLine)}></ShareDetails> : null;
        return(
            <div className="outer-container">
                <DashNav user={this.props.currentUser} logout={this.props.logout}/>
                <Modal close={this.closeModal} className="watchlist-modal" show={this.state.showModal} component={watchlistForm} comp={"watchlist-form"}/>
                <div className="stocks-page"> 
                    <div className="stock-info">
                        <div className="stocks-page-chart">
                            <h1>{this.props.compInfo.company.companyName}</h1>
                            <h1>{`$${currentPrice}`}</h1>
                            <div className="lg-container">
                                <LineGraph dataType={dataFormatType} data={this.props.data} color={color} refLine={refLine} dataHasTime={dataHasTime}></LineGraph>
                            </div>
                            <button className={this.props.timeframe == "1D" ? "activated" : ""} onClick={() => this.props.changeData("1D")}>1D</button>
                            <button className={this.props.timeframe == "1W" ? "activated" : ""} onClick={() => this.props.changeData("1W")}>1W</button>
                            <button className={this.props.timeframe == "1M" ? "activated" : ""} onClick={() => this.props.changeData("1M")}>1M</button>
                            <button className={this.props.timeframe == "3M" ? "activated" : ""} onClick={() => this.props.changeData("3M")}>3M</button>
                            <button className={this.props.timeframe == "1Y" ? "activated" : ""} onClick={() => this.props.changeData("1Y")}>1Y</button>
                            <button className={this.props.timeframe == "5Y" ? "activated" : ""} onClick={() => this.props.changeData("5Y")}>5Y</button>
                        </div>
                        <div>
                            {sharesComponent}
                        </div>
                        <div className="stock-page-description">
                            <h2>About</h2>
                            <p className="stock-page-section">{this.props.compInfo.company.description}</p>
                            <div className="sp-comp-info">
                                <div>
                                    <p className="sp-comp-info-head">CEO</p>
                                    <p>{this.props.compInfo.company.CEO}</p>
                                </div>
                                <div>
                                    <p className="sp-comp-info-head">Employees</p>
                                    <p>{this.props.compInfo.company.employees}</p>
                                </div>
                                <div>
                                    <p className="sp-comp-info-head">Headquarters</p>
                                    <p>{`${this.props.compInfo.company.city}, ${this.props.compInfo.company.state}`}</p>
                                </div>
                                <div>
                                    <p className="sp-comp-info-head">Sector</p>
                                    <p>{this.props.compInfo.company.sector}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stocks-page-right">
                        <StockTransactionForm
                            currentShares={currentShares}
                            createHolding={this.props.createHolding}
                            updateHolding={this.props.updateHolding}
                            deleteHolding={this.props.deleteHolding}
                            editCurrentUser={this.props.editCurrentUser}
                            ticker={this.props.stock}
                            stockId={this.props.stockId}
                            currentPrice={currentPrice}
                            currentUser={this.props.currentUser}
                        />
                        <button onClick={() => { this.setState({showModal: true}) }} className="watchlist-toggle">Add to Lists</button>
                    </div>
                </div>
            </div>
        )
    }
} 


export default Stock
