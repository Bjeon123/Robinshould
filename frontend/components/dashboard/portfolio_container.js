import React from 'react'
import {connect} from 'react-redux'
import Portfolio from './portfolio'
import { fetchAllQuotes,fetchWeekQuotes, fetchMonthQuotes, fetchThreeMonthsQuotes, fetchOneYearQuotes, fetchFiveYearQuotes } from '../../util/stock_api_util'
import { receiveTheme } from '../../actions/theme_actions'
import {fetchStockTickers} from '../../util/stock_api_util'
import LoadingPage from '../loading/loading_screen'

class PortfolioContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeframe: null,
            stocks: [],
            stats: null,
            timeframe: null,
            holdings: {},
            data: null
        }
        this.getData = this.getData.bind(this)
        this.changeData= this.changeData.bind(this)
    }

    changeData(timeframe){
        let StockArr = Object.values(this.state.stocks)
        let tickerArr = []
        for (let i = 0; i < StockArr.length; i++) {
            tickerArr.push(StockArr[i].ticker)
        }
        if(timeframe==="1D"){
            fetchAllQuotes(tickerArr).then((data) => this.setState({ data: data,timeframe:timeframe }))
        }
        if(timeframe==="1W"){
            fetchWeekQuotes(tickerArr).then((data) => this.setState({ data: data,timeframe:timeframe }))
        }
        else if (timeframe==="1M"){
            fetchMonthQuotes(tickerArr).then((data) => this.setState({ data: data,timeframe:timeframe }))
        }
        else if(timeframe==="3M"){
            fetchThreeMonthsQuotes(tickerArr).then((data) => this.setState({ data: data,timeframe:timeframe}))
        }
        else if (timeframe === "1Y") {
            fetchOneYearQuotes(tickerArr).then((data) => this.setState({ data: data ,timeframe:timeframe}))
        }
        else if (timeframe === "5Y") {
            fetchFiveYearQuotes(tickerArr).then((data) => this.setState({ data: data,timeframe:timeframe }))
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

    getData(){
        let StockArr = Object.values(this.state.stocks);
        let tickerArr = [];
        for (let i = 0; i < StockArr.length; i++) {
            tickerArr.push(StockArr[i].ticker)
        }
        fetchAllQuotes(tickerArr).then((data) => this.setState({data}))
    }

    render() {
        if(this.state.data === null){
            return <LoadingPage/>
        }
        else{
            return (
                <Portfolio 
                    theme = {this.props.theme}
                    receiveTheme = {this.props.receiveTheme}
                    user={this.props.user} 
                    holdings={this.props.holdings} 
                    timeframe={this.state.timeframe} 
                    data ={this.state.data} 
                    stocks={Object.values(this.state.stocks)}
                    changeData={this.changeData}>
                </Portfolio>
            )
        }
    }
}

const mSTP = state =>({
    theme: state.theme
})

const mDTP = dispatch =>({
    receiveTheme: theme => dispatch(receiveTheme(theme))
})

export default connect(mSTP,mDTP)(PortfolioContainer)