import React from 'react'
import { connect } from 'react-redux'
import Portfolio from './portfolio'
import { fetchAllQuotes,fetchWeekQuotes, fetchMonthQuotes, fetchThreeMonthsQuotes, fetchOneYearQuotes, fetchFiveYearQuotes } from '../../util/stock_api_util'
import {fetchStockTickers} from '../../util/stock_api_util'

class PortfolioContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeframe: null,
            tempData:{},
            stocks: [],
            stats: null,
            timeframe: null,
            holdings: {},
            data: null
        }
        this.getData = this.getData.bind(this)
        this.formatData = this.formatData.bind(this)
        this.changeData= this.changeData.bind(this)
    }

    changeData(timeframe){
        this.setState({ timeframe: timeframe })
        let StockArr = Object.values(this.state.stocks)
        let tickerArr = []
        for (let i = 0; i < StockArr.length; i++) {
            tickerArr.push(StockArr[i].ticker)
        }
        if(timeframe==="1D"){
            fetchAllQuotes(tickerArr).then((data) => this.setState({ tempData: data })).then(() => {
                this.formatData(this.state.tempData, tickerArr);
            })
        }
        if(timeframe==="1W"){
            fetchWeekQuotes(tickerArr).then((data) => this.setState({ tempData: data })).then(() => {
                this.formatData(this.state.tempData, tickerArr);
            })
        }
        else if (timeframe==="1M"){
            fetchMonthQuotes(tickerArr).then((data) => this.setState({ tempData: data })).then(() => {
                this.formatData(this.state.tempData, tickerArr);
            })
        }
        else if(timeframe==="3M"){
            fetchThreeMonthsQuotes(tickerArr).then((data) => this.setState({ tempData: data})).then(() => {
                this.formatData(this.state.tempData, tickerArr)
            })
        }
        else if (timeframe === "1Y") {
            fetchOneYearQuotes(tickerArr).then((data) => this.setState({ tempData: data })).then(() => {
                this.formatData(this.state.tempData, tickerArr)
            })
        }
        else if (timeframe === "5Y") {
            fetchFiveYearQuotes(tickerArr).then((data) => this.setState({ tempData: data })).then(() => {
                this.formatData(this.state.tempData, tickerArr);
            })
        }
    }

    componentDidMount(){
        fetchStockTickers(this.props.user.id).then((stocks) => {
            this.setState({ 
                stocks: stocks,
                timeframe: "1D"
            })
        })
        .then(()=> {
            this.getData()
        })
    }

    formatData(data,tickerArr){
        console.log(data)
        const dataFormatType = data[tickerArr[0]]['chart'] ? 'chart' : 'intraday-prices' 
        let longestDatasetTicker = ""
        let maxDataSet = 0;
        let sharesHashMap={};
        for(let i =0; i < tickerArr.length;i++){
            if (data[tickerArr[i]][dataFormatType].length > maxDataSet){
                maxDataSet = data[tickerArr[i]][dataFormatType].length;
                longestDatasetTicker= tickerArr[i]
            }
        }
        for (const holdingId in this.props.holdings) {
            sharesHashMap[this.state.stocks[this.props.holdings[holdingId].ticker_id].ticker] = this.props.holdings[holdingId].shares
        }
        let firstIteration = true;
        let newData = { [dataFormatType]:[]}
        for(const ticker in data){
            for (let i = 0; i < data[ticker][dataFormatType].length;i++){
                let newRow={};
                if(firstIteration === true){
                    newRow.date = data[ticker][dataFormatType][i].date
                    newRow.minute = data[ticker][dataFormatType][i].minute
                    newRow.close = 0;
                    newRow.close += (data[ticker][dataFormatType][i].close * sharesHashMap[ticker]) + this.props.user.total_capital
                    newData[dataFormatType].push(newRow)
                }
                else{
                    newData[dataFormatType][i].close += data[ticker][dataFormatType][i].close * sharesHashMap[ticker]
                }
            }
            firstIteration=false;
        }
        this.setState({data: newData})
    }

    getData(){
        let StockArr = Object.values(this.state.stocks)
        let tickerArr=[]
        for (let i =0;i<StockArr.length;i++){
            tickerArr.push(StockArr[i].ticker)
        }
        fetchAllQuotes(tickerArr).then((data) => this.setState({tempData: data})).then(()=>
            {
                this.formatData(this.state.tempData,tickerArr);
            }
        )
    }

    render() {

        if(this.state.data === null){
            return null
        }
        return (
            <Portfolio timeframe={this.state.timeframe} data ={this.state.data} changeData={this.changeData}></Portfolio>
        )
    }
}

export default PortfolioContainer