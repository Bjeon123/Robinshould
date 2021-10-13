import React from 'react'
import LineGraph from '../charts/line_graph'
import {numToMoney} from '../../util/numbers_api.util'
import {formatPortfolio} from '../../util/numbers_api.util'

const Portfolio=(props)=>{
    // const dataFormatType = props.data['chart'] !== undefined ? 'chart' : 'intraday-prices'
    // let dataLastIdx = props.data[dataFormatType].length - 1;
    // let refLine = props.data[dataFormatType][0]['close'].toFixed(2).toString();
    // let currentPrice = props.data[dataFormatType][dataLastIdx]['close'].toFixed(2);
    // let color = props.data[dataFormatType][0]['close'] < props.data[dataFormatType][dataLastIdx]['close'] ? "green" : "red";
    // let dataHasTime = true;
    // if (props.timeframe == "3M" || props.timeframe == "1Y" || props.timeframe == "5Y") {
    //     dataHasTime = false;
    // }
    let tickerArr = [];
    for (let i = 0; i < props.stocks ; i++) {
        tickerArr.push(props.stocks[i].ticker)
    }
    const DataFormatted = formatPortfolio(props.data,props.timeframe, props.holdings,props.user.total_capital)
    console.log(DataFormatted.data)
    return(
        <div className="portfolio">
            {/* <h1>{numToMoney.format(currentPrice)}</h1> */}
            <LineGraph max={DataFormatted.max} min={DataFormatted.min} data={DataFormatted.data} color={DataFormatted.color}/>
            <button className={props.timeframe == "1D" ? "activated" : ""} onClick={() => props.changeData("1D")}>1D</button>
            <button className={props.timeframe == "1W" ? "activated" : ""} onClick={() => props.changeData("1W")}>1W</button>
            <button className={props.timeframe == "1M" ? "activated" : ""} onClick={() => props.changeData("1M")}>1M</button>
            <button className={props.timeframe == "3M" ? "activated" : ""} onClick={() => props.changeData("3M")}>3M</button>
            <button className={props.timeframe == "1Y" ? "activated" : ""} onClick={() => props.changeData("1Y")}>1Y</button>
            <button className={props.timeframe == "5Y" ? "activated" : ""} onClick={() => props.changeData("5Y")}>5Y</button>
        </div>
    )
}

export default Portfolio