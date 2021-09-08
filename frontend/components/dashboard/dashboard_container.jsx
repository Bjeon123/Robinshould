import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/session_actions'
import {getCurrentUser,setCurrentUser} from '../../actions/users_actions'
import Dashboard from './dashboard'

class DashBoardContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCurrentUser(this.props.session.id)
    }

    render() {
        const check = Object.values(this.props.user)
        if ( check.length === 0){
            return null;
        }
        return (
            <Dashboard logout={this.props.logout} user={this.props.user}></Dashboard>
        )
    }
}

const mSTP = state =>(
    {
        session: state.session,
        user: state.user
    }
)

const mDTP = dispatch =>(
    {
        logout: () => dispatch(logout()),
        getCurrentUser: userId => dispatch(getCurrentUser(userId)),
        setCurrentUser: user => dispatch(setCurrentUser(user))
    }
)

export default connect(mSTP,mDTP)(DashBoardContainer)