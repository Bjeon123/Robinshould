import React from 'react'
import {connect} from 'react-redux'
import Stock from './stock'
import { fetchStockWeekData, fetchStockMonthData, fetchStock3MonthData, fetchStockYearData,fetchStock5YearData,fetchStockStats} from '../../util/stock_api_util'


class StockContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            stats: null,
            timeframe: null,
            data: null,
            fetchMethods: null
        }
        this.changeData=this.changeData.bind(this)
    }

    changeData(timeframe){
        this.setState({ timeframe: timeframe })
        const stock = this.props.stock
        fetchStockStats(stock).then((stats) => this.setState({ stats: stats }))
        if (timeframe === "1W" || this.state.timeframe === null) {
            fetchStockWeekData(stock).then((data) => this.setState({ data: data }))
        }
        else if (timeframe === "1M") {
            fetchStockMonthData(stock).then((data) => this.setState({ data: data }))
        }
        else if (timeframe === "3M") {
            fetchStock3MonthData(stock).then((data) => this.setState({ data: data }))
        }
        else if (timeframe === "1Y") {
            fetchStockYearData(stock).then((data) => this.setState({ data: data }))
        }
        else if (timeframe === "5Y") {
            fetchStockYearData(stock).then((data) => this.setState({ data: data }))
        }
    }


    componentDidMount(){
        const stock = this.props.stock
        fetchStockStats(stock).then((stats) =>this.setState({stats: stats}))
        if (this.state.timeframe === "1W" || this.state.timeframe === null){
            fetchStockWeekData(stock).then((data) => this.setState({ data: data }))
        }
        else if (this.state.timeframe === "1M"){
            fetchStockMonthData(stock).then((data) => this.setState({ data: data }))
        }
        else if (this.state.timeframe === "3M"){
            fetchStock3MonthData(stock).then((data) => this.setState({ data: data }))
        }
        else if (this.state.timeframe === "1Y"){
            fetchStockYearData(stock).then((data) => this.setState({ data: data }))
        }
        else if (this.state.timeframe === "5Y"){
            fetchStockYearData(stock).then((data) => this.setState({ data: data }))
        }
    }

    render(){
        if(this.state.data===null){
            return null;
        }
        return(
            <Stock stock ={this.props.stock} data={this.state.data} compInfo={this.state.stats} changeData={this.changeData}/>
        )
    }
}

const mSTP = (state,ownProps) =>(
    {
        stock: ownProps.match.params.ticker,
    }
)

const mDTP = dispatch =>(
    {
        fetchStockWeekData: (stock) => dispatch(fetchStockWeekData(stock)),
        fetchStockStats: (stock) => dispatch(fetchStockStats(stock)),
        fetchStockMonthData: (stock) => dispatch(fetchStockMonthData(stock)),
        fetchStock3MonthData: (stock) => dispatch(fetchStock3MonthData(stock)),
        fetchStockYearData: (stock) => dispatch(fetchStockYearData(stock)),
        fetchStock5YearData: (stock) => dispatch(fetchStock5YearData(stock))
    }
)

export default connect(mSTP,mDTP)(StockContainer)