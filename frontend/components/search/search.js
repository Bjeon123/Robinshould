import React from 'react';
import { searchStocks } from '../../util/stock_api_util';
import {Link} from 'react-router-dom'

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchInput: "",
            stocks: null
        }
        this.getResults=this.getResults.bind(this)
        this.handleCloseResults=this.handleCloseResults.bind(this)
    }


    getResults(e){
        this.setState({searchInput: e.target.value},
            ()=>{
                if(this.state.searchInput === ""){
                    this.setState({stocks: null})
                }
                else{
                    searchStocks(e.target.value).then(
                        searchResults => this.setState({stocks: searchResults})
                    )
                }
            }
        )
    }

    handleCloseResults(){
        this.setState({stocks: null})
    }

    render(){
        let searchResults= []
        if(this.state.stocks !== null){
            if(this.state.stocks.length===0){
                searchResults.push(<p>We were unable to find any results for your search.</p>)
            }
            else{
                searchResults.push(<p>Stocks</p>)
            }
            window.addEventListener("click", this.handleCloseResults);
            for(let i=0;i<this.state.stocks.length;i++){
                searchResults.push(
                    <Link to={`/stocks/${this.state.stocks[i].ticker}`}>
                        <div id={this.state.stocks[i].ticker} onClick={this.handleCloseResults} className="stock-row">
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
                    {this.state.stocks !== null ? searchResults : null}
                </div>
            </div>
        )
    }
}

export default Search;