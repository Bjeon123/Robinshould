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
            outerClass = "modal-content"
        }
        else if (comp === "wlform"){
            outerClass = "wlform-outer"
        }
        return(
            <div className="modal" style={{ color: "white" }}>
                <div className={outerClass}>
                    <button onClick={()=>this.props.close()} className="close-modal">X</button>
                    {this.props.component}
                </div>
            </div>
        )
    }
}

export default Modal