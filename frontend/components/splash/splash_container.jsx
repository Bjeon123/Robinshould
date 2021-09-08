import React from 'react';
import { connect } from 'react-redux'
import {signup,login} from '../../actions/session_actions'
import Splash from './splash'

const mDTP = dispatch =>({
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user))
})



export default connect(null,mDTP)(Splash)