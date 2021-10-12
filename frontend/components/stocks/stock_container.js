import React from 'react'
import {connect} from 'react-redux'
import Stock from './stock'
import { getCurrentUser, editCurrentUser } from '../../actions/users_actions'
import { fetchStockId,fetchintradayData,fetchStockWeekData, fetchStockMonthData, fetchStock3MonthData, fetchStockYearData,fetchStock5YearData,fetchStockStats} from '../../util/stock_api_util'
import { createHolding,updateHolding,deleteHolding} from '../../actions/holding_actions'
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
        this.props.getCurrentUser(window.currentUser.id)
    }

    changeData(timeframe){
        this.setState({ timeframe: timeframe })
        const stock = this.props.stock
        fetchStockStats(stock).then((stats) => this.setState({ stats: stats }))
        if (timeframe === "1D" || this.state.timeframe === null){
            fetchintradayData(stock).then((data) => this.setState({ data: data }))
        }
        else if (timeframe === "1W"){
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
            logout = {this.props.logout}
            watchlists= {this.props.watchlists}
            fetchWatchlists={this.props.fetchWatchlists}
            createHolding={this.props.createHolding} 
            updateHolding={this.props.updateHolding}
            deleteHolding={this.props.deleteHolding}
            editCurrentUser={this.props.editCurrentUser}
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
        stock: ownProps.match.params.ticker,
        sessions: state.sessions,
        currentUser: state.user,
        watchlists: state.watchlists
    }
)

const mDTP = dispatch =>(
    {
        fetchStockId: (ticker) => dispatch(fetchStockId(ticker)),
        fetchStockWeekData: (stock) => dispatch(fetchStockWeekData(stock)),
        fetchStockStats: (stock) => dispatch(fetchStockStats(stock)),
        fetchStockMonthData: (stock) => dispatch(fetchStockMonthData(stock)),
        fetchStock3MonthData: (stock) => dispatch(fetchStock3MonthData(stock)),
        fetchStockYearData: (stock) => dispatch(fetchStockYearData(stock)),
        fetchStock5YearData: (stock) => dispatch(fetchStock5YearData(stock)),
        getCurrentUser: (userId) => dispatch(getCurrentUser(userId)),
        createHolding: (holding) =>dispatch(createHolding(holding)),
        updateHolding: (holding) => dispatch(updateHolding(holding)),
        deleteHolding: (holding) => dispatch(deleteHolding(holding)),
        editCurrentUser: (user) => dispatch(editCurrentUser(user)),
        fetchWatchlists: ()=> dispatch(fetchWatchlists()),
        logout: ()=> dispatch(logout())
    }
)

export default connect(mSTP,mDTP)(StockContainer)