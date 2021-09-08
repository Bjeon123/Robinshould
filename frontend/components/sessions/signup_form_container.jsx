import { signup, clearErrors } from '../../actions/session_actions'
import { connect } from 'react-redux'
import SignUp from './signin_form'

const mSTP = state => (
    {
        errors: Object.values(state.errors)
    }
)

const mDTP = dispatch => (
    {
        signup: (user) => dispatch(signup(user)),
        clearErrors: ()=> dispatch(clearErrors())
    }
)

export default connect(mSTP, mDTP)(SignUp)