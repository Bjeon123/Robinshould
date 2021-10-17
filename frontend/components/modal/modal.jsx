import React from 'react';
class Modal extends React.Component{
    constructor(props){
        super(props)
        this.handleClose=this.handleClose.bind(this)
    }
    
    handleClose(e) {
        if (e.target === this) {
            this.props.close();
        }
    }
    render(){
        if (!this.props.show) {
            return null;
        }
        let outerClass;
        const {comp} = this.props;
        if (comp === "watchlist-form"){
            outerClass = "wl-form-modal"
        }
        else if (comp==="buying-power-form"){
            outerClass = "buying-power-container"
        }
        return(
            <div className={outerClass} style={{ color: "white" }}>
                    {comp==="watchlist-form" ? null : <button onClick={()=>this.props.close()} className={`close-modal ${this.props.theme}`}>X</button>}
                    {this.props.component}
            </div>
        )
    }
}

export default Modal