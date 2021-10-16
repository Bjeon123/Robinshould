import React, { useState, useEffect } from 'react';
import LineGraph from '../charts/line_graph'
import {numToMoney,cashChange, percentChange} from '../../util/numbers_api.util'
import {formatPortfolio} from '../../util/numbers_api.util'

class Portfolio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            price: "",
            percentChange: "",
            cashChange: "",
            data: formatPortfolio(this.props.data,this.props.timeframe, this.props.holdings,this.props.user.total_capital)
        }
        this.setPrice=this.setPrice.bind(this)
    }

    componentDidMount(){
        const color = this.state.data.firstPrice < this.state.data.currentPrice ? "green" : "red";
        this.props.receiveTheme(color)
    }

    static getDerivedStateFromProps(props, state) {
        if(state.price !== ""){
            return {}
        }
        else{
            let newData = formatPortfolio(props.data,props.timeframe, props.holdings,props.user.total_capital)
            const color = newData.firstPrice < newData.currentPrice ? "green" : "red";
            if(props.theme !== color){
                props.receiveTheme(color)
            }
            return {data: newData };
        }
    }

    setPrice(price){
        const percentChanged = percentChange(this.state.data['firstPrice'], price)    
        const cashChanged = cashChange(this.state.data['firstPrice'], price)    
        if(price !== this.state.price){
            this.setState({price, percentChange: percentChanged, cashChange: cashChanged})
        }
    }
    

    render(){
        let tickerArr = [];
        for (let i = 0; i < this.props.stocks ; i++) {
            tickerArr.push(this.props.stocks[i].ticker)
        }
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
            <div className="portfolio">
                <div className="portfolio-numbers">
                    {this.state.price ? <h1>{`${numToMoney.format(this.state.price)}`}</h1> : <h1>{`${numToMoney.format(this.state.data.currentPrice)}`}</h1>}
                    {this.state.price ? <p>{`${this.state.cashChange} (${this.state.percentChange})`}</p> : 
                    <div className="portfolio-cash-percent">
                        <p>{`${this.state.data.cashChange} (${this.state.data.percentChange}) `}</p>
                        <p id="timeframe">{`${timeframe}`}</p>
                    </div>}
                </div>
                <LineGraph max={this.state.data.max} min={this.state.data.min} data={this.state.data.data} color={this.state.data.color} setPrice={this.setPrice} />
                <button className={this.props.timeframe == "1D" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1D")}>1D</button>
                <button className={this.props.timeframe == "1W" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1W")}>1W</button>
                <button className={this.props.timeframe == "1M" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1M")}>1M</button>
                <button className={this.props.timeframe == "3M" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("3M")}>3M</button>
                <button className={this.props.timeframe == "1Y" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("1Y")}>1Y</button>
                <button className={this.props.timeframe == "5Y" ? `activated ${this.props.theme}` : ""} onClick={() => this.props.changeData("5Y")}>ALL</button>
            </div>
        )
    }
}

export default Portfolio