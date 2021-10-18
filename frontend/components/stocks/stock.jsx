import React from 'react'
import LineGraph from '../charts/line_graph'
import NavBar from '../dashboard/nav_bar_container'
import StockTransactionForm from './stock_transaction_form_container'
import ShareDetails from './share_details'
import Modal from '../modal/modal'
import WatchlistForm from '../modal/watchlist_form'
import { formatSingleStockData,numToMoney,cashChange,percentChange } from '../../util/numbers_api.util'
import NewsElement from '../news/news_element'
import LoadingPage from '../loading/loading_screen'


class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showModal: false,
            price: "",
            showFullCompanyDescription: false,
            news: null,
            percentChange: "",
            cashChange: "",
            data: formatSingleStockData(this.props.data, this.props.timeframe)
        }
        this.closeModal=this.closeModal.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.formatCompanyDescription = this.formatCompanyDescription.bind(this);
        this.formatNews = this.formatNews.bind(this);
    }

    componentDidMount(){
        const color = this.state.data.firstPrice < this.state.data.currentPrice ? "green" : "red";
        this.setState({news: this.props.data['news']},
            ()=>this.props.receiveTheme(color)
        )
    }

    closeModal(){
        this.setState({showModal: false})
    }

    setPrice(price){
        const percentChanged = percentChange(this.state.data['firstPrice'], price)    
        const cashChanged = cashChange(this.state.data['firstPrice'], price)    
        if(price != this.state.price){
            this.setState({price, percentChange: percentChanged, cashChange: cashChanged})
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.price !== ""){
            return {}
        }
        else{
            let newData = formatSingleStockData(props.data,props.timeframe)
            const color = newData.firstPrice < newData.currentPrice ? "green" : "red";
            if(props.theme !== color){
                props.receiveTheme(color)
            }
            return {data: newData };
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
        const {data} = this.state;
        const watchlistForm = <WatchlistForm theme={this.props.theme} fetchWatchlists={this.props.fetchWatchlists} closeModal={this.closeModal} watchlists={this.props.watchlists} ticker={this.props.stock} stockId={this.props.stockId}/>
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
        const sharesComponent = currentShares ? <ShareDetails shares={currentShares} currentPrice={data.currentPrice} openPrice={data.data[0]['price']}></ShareDetails> : null;
        let timeframe;
        if(this.props.timeframe === "1D"){
            timeframe = "Today"
        }
        else if(this.props.timeframe === "1W"){
            timeframe = "Past Week"
        }
        else if(this.props.timeframe === "1M"){
            timeframe = "Past Month"
        }
        else if(this.props.timeframe === "3M"){
            timeframe = "Past 3 Months"
        }
        else if(this.props.timeframe === "1Y"){
            timeframe = "Past Year"
        }
        else{
            timeframe = "All Time"
        }
        return(
            <div className="outer-container">
                <NavBar/>
                <Modal close={this.closeModal} className="watchlist-modal" show={this.state.showModal} component={watchlistForm} comp={"watchlist-form"}/>
                <div className="stocks-page"> 
                    <div className="stock-info">
                        <div className={`stocks-page-chart ${this.props.theme}`}>
                            <h1>{this.props.compInfo.company.companyName}</h1>
                            {this.state.price ? <h1>{`${numToMoney.format(this.state.price)}`}</h1> : <h1>{`${numToMoney.format(data.currentPrice)}`}</h1>}
                            {this.state.price ? 
                            <div className="portfolio-cash-percent">
                                <p>{`${this.state.cashChange} (${this.state.percentChange})`}</p> 
                            </div>: 
                            <div className="portfolio-cash-percent">
                                <p>{`${data.cashChange} (${data.percentChange}) `}</p>
                                <p id="timeframe">{`${timeframe}`}</p>
                            </div>}
                            {/* <p>{`${data.cashChange} (${data.percentChange})`}</p> */}
                            <div className="stock-chart">
                                <LineGraph setPrice={this.setPrice} max={data.max} min={data.min} data={data.data} color={data.color}></LineGraph>
                                <button className={this.props.timeframe == "1D" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1D")}>1D</button>
                                <button className={this.props.timeframe == "1W" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1W")}>1W</button>
                                <button className={this.props.timeframe == "1M" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1M")}>1M</button>
                                <button className={this.props.timeframe == "3M" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("3M")}>3M</button>
                                <button className={this.props.timeframe == "1Y" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1Y")}>1Y</button>
                                <button className={this.props.timeframe == "5Y" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("5Y")}>5Y</button>
                            </div>
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
                        <div>
                            {stockNews}
                        </div>
                    </div>
                    <div className="stocks-page-right">
                        <StockTransactionForm
                            currentShares={currentShares}
                            ticker={this.props.stock}
                            stockId={this.props.stockId}
                            currentPrice={data.currentPrice}
                        />
                        <button onClick={() => { this.setState({showModal: true}) }} className={`watchlist-toggle ${this.props.theme}`}>Add to Lists</button>
                    </div>
                </div>
            </div>
        )
    }
} 


export default Stock
