import React from 'react'

class NewsElement extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const {newsData} = this.props
        return(
            <div className="news-row">
                <p>{newsData.source}</p>
                <p>{`${new Date(newsData.datetime).toLocaleString()}`}</p>
                <p>{newsData.headline}</p>
                <p>{newsData.summary}</p>
                <img src ={newsData.image}/>
            </div>
        )
    }
}

export default NewsElement