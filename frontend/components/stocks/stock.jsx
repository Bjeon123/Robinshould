import React from 'react'
import LineGraph from '../charts/line_graph'
import DashNav from '../dashboard/dashboard_nav'

const Stock = (props) =>{
    let dataLastIdx = props.data.chart.length-1;
    let refLine = props.data.chart[0]['average'].toString();
    let color = props.data.chart[0]['average'] < props.data.chart[dataLastIdx]['average'] ? "green" : "red" ;
    console.log(props)
    return(
        <div className="stocks-page">
            <DashNav/>
            <div className="stock-info">
                <div className="stocks-page-chart">
                    <h1>{props.compInfo.company.companyName}</h1>
                    <h1>$145.43</h1>
                    <LineGraph data={props.data} color={color} refLine={refLine}></LineGraph>
                    <button onClick={() =>props.changeData("1W")}>1D</button>
                    <button onClick={() =>props.changeData("1W")}>1W</button>
                    <button onClick={() =>props.changeData("1M")}>1M</button>
                    <button onClick={() =>props.changeData("1Y")}>1Y</button>
                    <button onClick={() =>props.changeData("5D")}>5Y</button>
                </div>
                <div className="stock-page-description">
                    <h2>About</h2>
                    <p className="stock-page-section">{props.compInfo.company.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Stock
