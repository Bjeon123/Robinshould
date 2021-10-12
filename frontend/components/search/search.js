import React from 'react';
import { searchStocks } from '../../util/stock_api_util';
import {Link} from 'react-router-dom'

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stocks: null
        }
        this.getResults=this.getResults.bind(this)
    }


    getResults(e){
        if(e.target.value===""){
            this.setState({stocks: null})
        }
        else{
            searchStocks(e.target.value).then(
                searchResults => this.setState({stocks: searchResults})
            )
        }
    }

    render(){
        let searchResults= [<p>Stocks</p>]
        console.log(this.state)
        if(this.state.stocks !== null){
            for(let i=0;i<this.state.stocks.length;i++){
                searchResults.push(
                    <Link to={`/stocks/${this.state.stocks[i].ticker}`}>
                        <div className="stock-row">
                            <p className="search-stock-ele">{this.state.stocks[i].ticker} </p>
                            <p>{this.state.stocks[i].company_name} </p>
                        </div>
                    </Link>
                )
            }
        }
        return(
            <div className="search-container">
                <div className="search">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input onChange={this.getResults} type="text" placeholder="Search" />
                    </div>
                    {this.state.stocks!== null ? searchResults : null}
                </div>
            </div>
        )
    }
}

export default Search;