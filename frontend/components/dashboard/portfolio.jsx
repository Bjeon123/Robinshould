import React from 'react'
import LineGraph from '../charts/line_graph'

class Portfolio extends React.Component{
    constructor(props){
        super(props)

    }

    

    render(){
        return(
            <div className="portfolio">
                <h1>{`$${this.props.user.total_capital.toFixed(2)}`}</h1>
                <LineGraph/>
            </div>
        )
    }
}

export default Portfolio