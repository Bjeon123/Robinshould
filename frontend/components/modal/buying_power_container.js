import {connect} from 'react-redux'
import { editCurrentUser } from '../../actions/users_actions'
import BuyingPower from './wl_form'

const mDTP = dispatch => (
    {
        editCurrentUser: (user) => dispatch(editCurrentUser(user))
    }
)

const mSTP = state =>(
    {
        currentUser: state.user
    }
)

export default connect(mSTP,mDTP)(BuyingPower)