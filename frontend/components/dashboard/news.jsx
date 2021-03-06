import React from 'react'
import { getNews } from '../../util/stock_api_util'
import NewsElement from '../news/news_element'

class News extends React.Component{
    constructor(props){
        super(props)
        this.state={
            news: null
        }
    }

    componentDidMount(){
        let tickerArr=["AAPL","TSLA","GOOG","MSFT","AMZN","FB"]
        getNews(tickerArr).then(
            news => this.setState({news: Object.values(news)})
        )
    }

    render(){
        if(!this.state.news){
            return null
        }
        let newsRenderArr=[];
        const {news} = this.state
        for(let i=0;i< this.state.news.length;i++){
            newsRenderArr.push(
                <NewsElement key={`${i}${news[i].headline}`} newsData={news[i].news[0]}/>
            )
        }
        return(
            <div className="news-container">
                <div className="news">
                    <h1>News</h1>
                    {newsRenderArr}
                </div>
            </div>
        )
    }

}

export default News