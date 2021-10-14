import React from 'react';
import {login, clearErrors} from '../../actions/session_actions'
import { connect } from 'react-redux'
import LoginForm from './login_form'


const mSTP = state => (
    {
        errors: Object.values(state.errors.sessions)
    }
)

const mDTP = dispatch =>(
    {
        login: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
    }
)

export default connect(mSTP,mDTP)(LoginForm)