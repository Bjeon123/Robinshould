import React from 'react'
import LineGraph from '../charts/line_graph'
import DashNav from '../dashboard/dashboard_nav'
import StockTransactionForm from './stock_transaction_form'
import ShareDetails from './share_details'
import Modal from '../modal/modal'
import WatchlistForm from '../modal/watchlist_form'
import { formatSingleStockData,numToMoney,formatPercent } from '../../util/numbers_api.util'
import NewsElement from '../news/news_element'


class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showModal: this.props.showModal,
            price: "",
            showFullCompanyDescription: false,
            news: null
        }
        this.closeModal=this.closeModal.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.formatCompanyDescription = this.formatCompanyDescription.bind(this);
        this.formatNews = this.formatNews.bind(this);
    }

    componentDidMount(){
        this.setState({news: this.props.data['news']})
    }

    closeModal(){
        this.setState({showModal: false})
    }

    setPrice(price){
        if(price != this.state.price){
            this.setState({price})
        }
    }

    formatCompanyDescription(text){
        if(text.length < 330){
            return text;
        }
        else if(this.state.showFullCompanyDescription === false){
            return text.substring(0,330)
        }
        else{
            return text;
        }
    }

    formatNews(){
        const {news} = this.state
        let newsRenderArr=[];
        for(let i=0; i<4; i++){
            if(!news[i]){
                break;
            }
            else{
                newsRenderArr.push(
                    <NewsElement newsData={news[i]}/>
                )
            }
        }
        return newsRenderArr
    }

    render(){
        const stockDataFormatted = formatSingleStockData(this.props.data, this.props.timeframe)
        const watchlistForm = <WatchlistForm fetchWatchlists={this.props.fetchWatchlists} closeModal={this.closeModal} watchlists={this.props.watchlists} ticker={this.props.stock} stockId={this.props.stockId}/>
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
        const stockNews = this.state.news ? this.formatNews() : null;
        const sharesComponent = currentShares ? <ShareDetails shares={currentShares} currentPrice={stockDataFormatted.currentPrice} openPrice={stockDataFormatted.data[0]['price']}></ShareDetails> : null;
        return(
            <div className="outer-container">
                <DashNav user={this.props.currentUser} logout={this.props.logout}/>
                <Modal close={this.closeModal} className="watchlist-modal" show={this.state.showModal} component={watchlistForm} comp={"watchlist-form"}/>
                <div className="stocks-page"> 
                    <div className="stock-info">
                        <div className="stocks-page-chart">
                            <h1>{this.props.compInfo.company.companyName}</h1>
                            {this.state.price ? <h1>{`${numToMoney.format(this.state.price)}`}</h1> : <h1>{`${numToMoney.format(stockDataFormatted.currentPrice)}`}</h1>}
                            <p>{`${numToMoney.format(stockDataFormatted.cashChange)} (${formatPercent(stockDataFormatted.percentChange)})`}</p>
                            <div className="lg-container">
                                <LineGraph setPrice={this.setPrice} max={stockDataFormatted.max} min={stockDataFormatted.min} data={stockDataFormatted.data} color={stockDataFormatted.color}></LineGraph>
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
                            <div className="company-description">
                                <p className="stock-page-section">{this.formatCompanyDescription(this.props.compInfo.company.description)}</p>
                                {this.state.showFullCompanyDescription ? <p onClick={()=> this.setState({showFullCompanyDescription: false})}>Show Less</p> : <p onClick={()=> this.setState({showFullCompanyDescription: true}) }>Show More</p>}
                            </div>
                            <div className="sp-comp-info">
                                <div >
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
                        <h2>News</h2>
                        <div className="news-container">
                            {stockNews}
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
                            currentPrice={stockDataFormatted.currentPrice}
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
