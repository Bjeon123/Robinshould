import React from 'react'
import { fetchintradayData,fetchStockTicker} from '../../util/stock_api_util'
import LineChart from '../charts/line_graph'
import { Link } from 'react-router-dom';
import { formatSingleStockData} from '../../util/numbers_api.util'



class WatchListCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: null,
            ticker: null,
            type: null
        }
    }

    componentDidMount(){
        const type = this.props.stock ? "watchlist" : "holding"
        if(type==='watchlist'){
            fetchintradayData(this.props.stock.ticker).then(
                (tickerdata)=> this.setState(
                    { data: tickerdata, ticker: this.props.stock.ticker, type: "watchlist" }
                )
            )
        }
        else{
            fetchStockTicker(this.props.holding.ticker_id).then(
                (ticker)=>{
                    this.setState({ticker: ticker.ticker})
                    fetchintradayData(ticker.ticker).then(
                        (tickerdata) => {
                            this.setState(
                                { ticker: ticker.ticker, data: tickerdata, type: "holding"  }
                        )}
                    )
                }
            )
        }
    }

    render(){
        if(this.state.data===null){
            return null;
        }
        const dataFormatted = formatSingleStockData(this.state.data);
        // const percentChange = (((this.state.data['intraday-prices'][lastIdx].close - this.state.data['intraday-prices'][0].close) / this.state.data['intraday-prices'][0].close) * 100).toFixed(2);
        const info = this.state.type === "watchlist" ? 
            <div><h1>{this.state.ticker}</h1></div> :
            <div className="card-ticker-share">
                <h1>{this.state.ticker}</h1>
                <p>{this.props.holding.shares} shares</p>
            </div>
        return (
            <Link to={`/stocks/${this.state.ticker}`}>
                <div className="watchlist-card">
                    {info}
                    <LineChart min={dataFormatted.min} max ={dataFormatted.max} color={dataFormatted.color} data={dataFormatted.data}lw={.4} width={55} height={30}/>
                    <div className="card-pp">
                        <p>${dataFormatted.currentPrice}</p>
                        <p style={{ color: dataFormatted.color }}>{dataFormatted.percentChange.toFixed(2)}%</p>
                    </div>
                </div> 
            </Link>
        )
    }
}

export default WatchListCard