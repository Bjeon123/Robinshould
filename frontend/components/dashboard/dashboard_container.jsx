import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/session_actions'
import {getCurrentUser} from '../../actions/users_actions'
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
        if (check.length === 0){
            return null;
        }
        return (
            <Dashboard theme={this.props.theme} logout={this.props.logout} user={this.props.user} component="dashboard"></Dashboard>
        )
    }
}

const mSTP = state =>(
    {
        session: state.session,
        user: state.user,
        theme: state.theme
    }
)

const mDTP = dispatch =>(
    {
        logout: () => dispatch(logout()),
        getCurrentUser: userId => dispatch(getCurrentUser(userId)),
        
    }
)

export default connect(mSTP,mDTP)(DashBoardContainer)