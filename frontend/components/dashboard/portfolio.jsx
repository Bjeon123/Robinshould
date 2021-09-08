import React from 'react'

class Portfolio extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="portfolio">
                <h1>{`$${this.props.user.total_capital.toFixed(2)}`}</h1>
            </div>
        )
    }
}

export default Portfolio