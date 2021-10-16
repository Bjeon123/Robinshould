import React from 'react'
import {Link} from 'react-router-dom'
import { numToMoney } from '../../util/numbers_api.util'
import Search from '../search/search'

class DashNav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            opened: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleWindowClick=this.handleWindowClick.bind(this)
    }

    handleClick(e){
        e.stopPropagation();
        this.setState({ opened: !this.state.opened })
    }

    handleWindowClick(e){
        this.setState({opened: false})
    }

    render(){
        const {user}=this.props
        let compTorender = null;
        if (this.state.opened === true) {
            window.addEventListener("click", this.handleWindowClick);
            compTorender =
            <div className="account-dropdown">
                <div className="dropdown-name">
                    <h1>{user.first_name}</h1>
                    <h1>{user.last_name}</h1>
                </div>
                <div className="dropdown-user-info">
                    <h1>{numToMoney.format(user.total_capital)}</h1>
                    <h1 id="dropdown-buying-power">Buying Power</h1>
                </div>
                <a href="https://www.linkedin.com/in/byung-jeon-01a68812a/">
                    <div className="personal-links">
                        <div className="personal-links-inner">
                            <i className="fab fa-linkedin-in"></i>
                            <h1>LinkedIn</h1>
                        </div>
                    </div>
                </a>
                <a href="https://github.com/Bjeon123">
                    <div id="dropdown-last-link" className="personal-links">
                        <div className="personal-links-inner">
                            <i className="fab fa-github"></i>
                            <h1>GitHub</h1>
                        </div>
                    </div>
                </a>
                <div className="personal-links">
                    <div className="personal-links-inner">
                        <i className="fas fa-sign-out-alt"></i>
                        <div onClick={() => this.props.logout()}>Log Out</div>
                    </div>
                </div>
            </div>
        }
        return (
            <div>
                <nav className={`dash-nav`}>
                    <div className="dash-nav-left">
                        <img className="tree" src={window.tree} width="4%" />
                        <Search theme={this.props.theme}/>
                    </div>
                    <div className={`dash-nav-right ${this.props.theme}`}>
                        <Link to={"/dashboard"}>
                            <button>Portfolio</button>
                        </Link>
                        <button>Github</button>
                        <button>LinkedIn</button>
                        <button onClick={(e)=>this.handleClick(e)}>Account</button>
                    </div>
                </nav>
                {compTorender}
            </div>
        )
    }
}

export default DashNav