import React from 'react'
import {Link} from 'react-router-dom'

class NewsElement extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const {newsData} = this.props
        let relatedStock = newsData.related.split(",")[0]
        let relatedStockLink = 
                <Link to={`/stocks/${relatedStock}`}>
                    <p id="stock-link">{relatedStock}</p>
                </Link>
        console.log(newsData)
        return(
            <a href={newsData.url} target="_blank">
                <div className="news-row-container">
                    <div className="news-row">
                        <div className="news-title">
                            <p className="news-source">{newsData.source}</p>
                            <p>{`${new Date(newsData.datetime).toLocaleString()}`}</p>
                        </div>
                        <div className="article">
                            <div>
                                <p className="news-headline">{newsData.headline}</p>
                                <div className="related-stocks">
                                    Feautured: {relatedStockLink}
                                </div>
                            </div>
                            <img className="news-image" src ={newsData.image}/>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}

export default NewsElement