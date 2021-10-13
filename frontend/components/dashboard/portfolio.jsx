import React, { useState, useEffect } from 'react';
import LineGraph from '../charts/line_graph'
import {numToMoney} from '../../util/numbers_api.util'
import {formatPortfolio} from '../../util/numbers_api.util'

class Portfolio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            price: ""
        }
        this.setPrice=this.setPrice.bind(this)
    }

    setPrice(price){
        if(price != this.state.price){
            this.setState({price})
        }
    }

    render(){
        let tickerArr = [];
        for (let i = 0; i < this.props.stocks ; i++) {
            tickerArr.push(this.props.stocks[i].ticker)
        }
        const DataFormatted = formatPortfolio(this.props.data,this.props.timeframe, this.props.holdings,this.props.user.total_capital)
        return(
            <div className="portfolio">
                {this.state.price ? <h1>{`${numToMoney.format(this.state.price)}`}</h1> : <h1>{`${numToMoney.format(DataFormatted.currentPrice)}`}</h1>}
                <LineGraph max={DataFormatted.max} min={DataFormatted.min} data={DataFormatted.data} color={DataFormatted.color} setPrice={this.setPrice} />
                <button className={this.props.timeframe == "1D" ? "activated" : ""} onClick={() => this.props.changeData("1D")}>1D</button>
                <button className={this.props.timeframe == "1W" ? "activated" : ""} onClick={() => this.props.changeData("1W")}>1W</button>
                <button className={this.props.timeframe == "1M" ? "activated" : ""} onClick={() => this.props.changeData("1M")}>1M</button>
                <button className={this.props.timeframe == "3M" ? "activated" : ""} onClick={() => this.props.changeData("3M")}>3M</button>
                <button className={this.props.timeframe == "1Y" ? "activated" : ""} onClick={() => this.props.changeData("1Y")}>1Y</button>
                <button className={this.props.timeframe == "5Y" ? "activated" : ""} onClick={() => this.props.changeData("5Y")}>5Y</button>
            </div>
        )
    }
}

export default Portfolio