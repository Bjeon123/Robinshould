import React from 'react'
import {connect} from 'react-redux'
import Stock from './stock'
import { getCurrentUser, editCurrentUser } from '../../actions/users_actions'
import { fetchStockId,fetchintradayData,fetchStockWeekData, fetchStockMonthData, fetchStock3MonthData, fetchStockYearData,fetchStock5YearData,fetchStockStats} from '../../util/stock_api_util'
import {receiveTheme} from '../../actions/theme_actions'
// import { createHolding,updateHolding,deleteHolding} from '../../actions/holding_actions'
import {fetchWatchlists} from '../../actions/watchlist_actions'
import {logout} from '../../actions/session_actions'

class StockContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            stock: this.props.stock,
            stockId: null,
            stats: null,
            timeframe: null,
            data: null,
            fetchMethods: null
        }
        this.changeData=this.changeData.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
    }

    changeData(timeframe){
        const stock = this.props.stock
        fetchStockStats(stock).then((stats) => this.setState({ stats: stats }))
        if (timeframe === "1D" || this.state.timeframe === null){
            fetchintradayData(stock).then((data) => this.setState({ data: data,timeframe: timeframe }))
        }
        else if (timeframe === "1W"){
            fetchStockWeekData(stock).then((data) => this.setState({ data: data ,timeframe: timeframe}))
        }
        else if (timeframe === "1M") {
            fetchStockMonthData(stock).then((data) => this.setState({ data: data,timeframe: timeframe }))
        }
        else if (timeframe === "3M") {
            fetchStock3MonthData(stock).then((data) => this.setState({ data: data,timeframe: timeframe }))
        }
        else if (timeframe === "1Y") {
            fetchStockYearData(stock).then((data) => this.setState({ data: data ,timeframe: timeframe}))
        }
        else if (timeframe === "5Y") {
            fetchStockYearData(stock).then((data) => this.setState({ data: data,timeframe: timeframe }))
        }
    }

    updateComponent(){
        this.setState({stock: this.props.stock},()=>{
            fetchStockId(this.props.stock).then((stockId) => this.setState({stockId: stockId})).then(
                ()=>{
                    this.props.fetchWatchlists().then(
                        ()=>{
                            fetchStockStats(this.props.stock).then((stats) => this.setState({ stats: stats })).then(
                                ()=>{
                                    fetchintradayData(this.props.stock).then((data) => this.setState({ data: data }))
                                }
                            )
                        }
                    )
                }
            )
        })
    }

    componentDidMount(){
        this.props.getCurrentUser(window.currentUser.id)
        fetchStockId(this.props.stock).then((stockId) => this.setState({stockId: stockId})).then(
            ()=>{
                this.props.fetchWatchlists().then(
                    ()=>{
                        fetchStockStats(this.props.stock).then((stats) => this.setState({ stats: stats })).then(
                            ()=>{
                                fetchintradayData(this.props.stock).then((data) => this.setState({ data: data }))
                            }
                        )
                    }
                )
            }
        )
    }

    render(){
        if(this.state.data===null){
            return null;
        }
        else if(this.state.stock !== this.props.stock){
            this.updateComponent()
        }
        return(
            <Stock 
            theme= {this.props.theme}
            receiveTheme = {this.props.receiveTheme}
            watchlists= {this.props.watchlists}
            fetchWatchlists={this.props.fetchWatchlists}
            timeframe={this.state.timeframe || "1D"} 
            stockId={this.state.stockId} 
            currentUser={this.props.currentUser} 
            stock ={this.props.stock} 
            data={this.state.data} 
            compInfo={this.state.stats} 
            changeData={this.changeData}/>
        )
    }
}

const mSTP = (state,ownProps) =>(
    {
        theme: state.theme,
        stock: ownProps.match.params.ticker,
        sessions: state.sessions,
        currentUser: state.user,
        watchlists: state.watchlists,
    }
)

const mDTP = dispatch =>(
    {
        receiveTheme: theme => dispatch(receiveTheme(theme)),
        fetchStockId: (ticker) => dispatch(fetchStockId(ticker)),
        fetchStockWeekData: (stock) => dispatch(fetchStockWeekData(stock)),
        fetchStockStats: (stock) => dispatch(fetchStockStats(stock)),
        fetchStockMonthData: (stock) => dispatch(fetchStockMonthData(stock)),
        fetchStock3MonthData: (stock) => dispatch(fetchStock3MonthData(stock)),
        fetchStockYearData: (stock) => dispatch(fetchStockYearData(stock)),
        fetchStock5YearData: (stock) => dispatch(fetchStock5YearData(stock)),
        getCurrentUser: (userId) => dispatch(getCurrentUser(userId)),
        editCurrentUser: (user) => dispatch(editCurrentUser(user)),
        fetchWatchlists: ()=> dispatch(fetchWatchlists()),
    }
)

export default connect(mSTP,mDTP)(StockContainer)