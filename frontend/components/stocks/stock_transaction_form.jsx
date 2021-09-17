import React from 'react'
import { createHolding, updateHolding, deleteHolding } from '../../util/holdings_api_util'

class StockTransactionForm extends React.Component{
    constructor(props){
        super(props)     
        this.state={
            form:{
                user_id: this.props.currentUser.id,
                ticker_id: this.props.stockId,
                avg_price: this.props.currentPrice,
                shares: 0
            },
            formType: "Buy Stock"
        }
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.props.currentShares === null){
            let newHolding = Object.assign({}, this.state.form)
            newHolding.shares = parseFloat(newHolding.shares)
            createHolding(newHolding)
            const updatedUser = {
                id: this.props.currentUser.id,
                first_name: this.props.currentUser.first_name,
                last_name: this.props.currentUser.last_name,
                total_capital: this.props.currentUser.total_capital - (this.state.form.avg_price * this.state.form.shares).toFixed(2)
            } 
            this.props.editCurrentUser(updatedUser);
        }
        else if (this.state.formType === "Buy Stock" && this.props.currentShares !== null){
            let updatedHolding = Object.assign({}, this.state.form)
            const floatShares = parseFloat(updatedHolding.shares)
            const floatAvgPrice = parseFloat(updatedHolding.avg_price)
            updatedHolding.id = this.props.currentShares.id
            updatedHolding.avg_price =  (floatAvgPrice * floatShares + this.props.currentShares.avg_price * this.props.currentShares.shares) /
                                        (floatShares + this.props.currentShares.shares).toFixed(2)
            updatedHolding.shares = floatShares + this.props.currentShares.shares;
            updateHolding(updatedHolding);
            const updatedUser = {
                id: this.props.currentUser.id,
                first_name: this.props.currentUser.first_name,
                last_name: this.props.currentUser.last_name,
                total_capital: (this.props.currentUser.total_capital - (floatShares * floatAvgPrice)).toFixed(2)
            }
            this.props.editCurrentUser(updatedUser);
        }
        else if (this.state.formType === "Sell Stock" && (this.props.currentShares.shares - this.state.form.shares > 0 )){
            let updatedHolding = Object.assign({}, this.state.form)
            const floatShares = parseFloat(updatedHolding.shares)
            const floatAvgPrice = parseFloat(updatedHolding.avg_price)
            updatedHolding.id = this.props.currentShares.id
            updatedHolding.shares = this.props.currentShares.shares - floatShares
            updateHolding(updatedHolding);
            const updatedUser = {
                id: this.props.currentUser.id,
                first_name: this.props.currentUser.first_name,
                last_name: this.props.currentUser.last_name,
                total_capital: (this.props.currentUser.total_capital + (floatShares * floatAvgPrice)).toFixed(2)
            }
            this.props.editCurrentUser(updatedUser);
        }
        else if (this.state.formType === "Sell Stock" && (this.props.currentShares.shares - this.state.form.shares === 0)){
            const floatShares = parseFloat(this.state.form.shares)
            const floatAvgPrice = parseFloat(this.state.form.avg_price)
            const updatedUser = {
                id: this.props.currentUser.id,
                first_name: this.props.currentUser.first_name,
                last_name: this.props.currentUser.last_name,
                total_capital: (this.props.currentUser.total_capital + (floatShares * floatAvgPrice)).toFixed(2)
            }
            this.setState({
                formType: "Buy Stock"
            })
            deleteHolding(this.props.currentShares).then(this.props.editCurrentUser(updatedUser));
        }

    }

    render(){
        if(this.state.form===undefined){
            return null;
        }
        const hasShares = this.props.currentShares !==null;
        return(
            <div>
                <form className="transaction-form">
                    <div className="transaction-options">
                        <h1 onClick={() => this.setState({ formType: "Buy Stock" })} id={this.state.formType === "Buy Stock" ? "active-transaction" : "inactive-transaction"}>{`Buy ${this.props.ticker}`}</h1>
                        {hasShares ? 
                            <h1 onClick={() => this.setState({ formType: "Sell Stock" })} id={this.state.formType === "Sell Stock" ? "active-transaction" : "inactive-transaction"} >{`Sell ${this.props.ticker}`}</h1> :
                            ""
                        }
                    </div>
                    <div className="tf-input-pair">
                        <label>Invest In </label>
                        <select>
                                <option>Shares</option>
                        </select>
                    </div>
                    <div className="tf-input-pair">
                        <label>Shares</label>
                        <input onChange={(e) => this.setState({ form: { ...this.state.form, shares: e.target.value } })} type="number" ></input>
                    </div>
                    <div id="mkt-price"className="tf-input-pair pt2">
                        <label >Market Price</label>
                        <h6>{`$${this.props.currentPrice}`}</h6>
                    </div>
                    <div className="tf-input-pair pt2">
                        <label>Estimated Costs</label>
                        <h6>${(this.props.currentPrice * this.state.form.shares).toFixed(2)}</h6>
                    </div>
                    <button onClick={this.handleSubmit} className="transaction-button">Execute Order</button>
                    {this.state.formType === "Buy Stock" ? 
                        <p id="tf-footer">${this.props.currentUser.total_capital.toFixed(2)} buying power available</p> :
                        <p id="tf-footer">{this.props.currentShares.shares} shares avaliable</p>
                    }
                </form>
            </div>
        )
    }
}

export default StockTransactionForm