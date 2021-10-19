# RobinShould
## Description
Robinshould is a clone of a website called Robinhood. Robinshould allows users to buy and sell stock for more than 8,000 stocks all of which have data such as  real-time data, historical data and much more which users can use to study which stocks they want to buy.
## Live Link to Robinshould 
https://robinshould.herokuapp.com/

## Features
### Stocks
Users can see data represented by linegraphs and dynamically change the graph data by changing the timeframe of the stock. Users can also buy and sell stocks on market orders and see the number of shares they bought as well as the average price of their holding. 
### Watchlists
Users can create watchlists with different names in order to organize the stocks that they are watching or researching. Users can add and delete stocks from a list, as well as change the name or delete a watchlist. 

## Featured Code
```javascript
  # The state of Porfolio Component
  this.state={
      price: "",
      percentChange: "",
      cashChange: "",
      data: formatPortfolio(this.props.data,this.props.timeframe, this.props.holdings,this.props.user.total_capital)
  }
  
  static getDerivedStateFromProps(props, state) {
        if(state.price !== ""){
            return {}
        }
        else{
            if(Object.values(props.holdings).length){
                let newData = formatPortfolio(props.data,props.timeframe, props.holdings,props.user.total_capital)
                const color = newData.firstPrice < newData.currentPrice ? "green" : "red";
                if(props.theme !== color){
                    props.receiveTheme(color)
                }
                return {data: newData };
            }
            else{
                return{}
            }
        }
    }
    
    setPrice(price){
        const percentChanged = percentChange(this.state.data['firstPrice'], price)    
        const cashChanged = cashChange(this.state.data['firstPrice'], price)    
        if(price !== this.state.price){
            this.setState({price, percentChange: percentChanged, cashChange: cashChanged})
        }
    }
```
Working on this component taught me much about optimizing the time complexity of my code. Unfortunately formatting the data for multiple stocks into a portfolio does not have the best time complexity as it is O(n^2) and at first I had the formatting data function in the render method where it would be called again on any state change, which was bad because setPrice is called a significant amount of times to render different prices and percentages based on where a user is hovering on a chart. In order to make the data only be formatted when the state change is the user requesting a different type of data I used "getDerivedStateFromProps", to check if the state change was from the parent component requesting information.

## Biggest Challenge
```javascript
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
```
Planning when to make calls to fetch data according to the timeframe that the user wanted taught me how to use asynchronous calls. The fetched data is formatted differently I had to make sure that the timeframe and data that is fetched changes the state at the same time so that there is no "cannot read undefined" errors when reading data.

## Technologies Used
#### Frontend
* React
* Redux
* HTML
* CSS/SCSS
#### Backend
* Ruby
* Rails
* PostgreSQL
#### Data API
* IEX Cloud


