import React from 'react'
import WatchlistItem from './watchlistCard'
import Modal from '../modal/modal'
import EditWatchListForm from '../modal/edit_watchlist_form.js'


class Watchlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            opened: false,
            settings: false,
            hovered: false,
            chervonSymbol: "fas fa-chevron-down",
            showModal: false
        }
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
        // this.closeSettings= this.closeSettings.bind(this)
    }

    // closeSettings(){
    //     this.setState({settings: false})
    // }
    closeModal(){
        this.setState({showModal: false})
    }

    showModal(e){
        e.stopPropagation();
        this.setState({showModal: true, settings: false, hovered: false})
    }

    render(){
        const watchListCards = this.props.watchlist.stocks.map((stock, index) => {
            return <WatchlistItem key={`${stock.ticker}${index}`} stock={stock} />
        })
        let settings;
        if(this.state.settings){
            // window.addEventListener("click", this.closeSettings)
            settings = 
            <div className="wl-settings">
                <div onClick={(e)=>this.showModal(e)} className={`wl-setting-row ${this.props.theme}`}>
                    <i className="fas fa-cog"></i>
                    <p>Edit List</p>
                </div>
                <div id={this.props.watchlist.id} onClick={(e) => this.props.handleClick(e)} className={`wl-setting-row ${this.props.theme}`}>
                    <i className="far fa-times-circle"></i>
                    <p>Delete List</p>
                </div>
            </div>
        }
        else{
            settings = null
        }
        const nextClass = this.state.chervonSymbol === "fas fa-chevron-up" ? "fas fa-chevron-down" : "fas fa-chevron-up"
        return(
            <div onMouseEnter={()=>this.setState({hovered: true})} onMouseLeave={()=>this.setState({hovered: false})} className="watchlist-container">
                {this.state.showModal ? <Modal close={this.closeModal} show={this.state.showModal} component={<EditWatchListForm closeModal={this.closeModal} updateWatchlist={this.props.updateWatchlist} id={this.props.watchlist.id} name={this.props.watchlist.name}/>} comp={"watchlist-form"}/>  : null}
                <div className="watchlist-title">
                    <h3>{this.props.watchlist.name}</h3>
                    {settings}
                    <div className={`dash-wl-btns ${this.props.theme}`}>
                        {this.state.hovered ? 
                            <i onClick={()=>{this.setState({settings: !this.state.settings})}} className="fas fa-ellipsis-h"></i>
                            // <i id={this.props.watchlist.id} onClick={(e) => this.props.handleClick(e)} className="far fa-trash-alt"></i> 
                            :
                            null 
                        }
                        <i onClick={() => this.setState({ opened: !this.state.opened, chervonSymbol: nextClass})} className={this.state.chervonSymbol}></i>
                    </div>
                </div>
                <ul>
                    {this.state.opened ? watchListCards : null}
                </ul>
            </div>
        )
    }

}

export default Watchlist