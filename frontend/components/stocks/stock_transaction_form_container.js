import {connect} from "react-redux"
import { createHolding,updateHolding,deleteHolding} from '../../actions/holding_actions'
import { editCurrentUser } from '../../actions/users_actions'
import StockTransactionForm from "./stock_transaction_form"

const mSTP = (state) =>({
    errors: Object.values(state.errors.holdings),
    currentUser: state.user,
    theme:state.theme
})

const mDTP = dispatch =>(
    {
        createHolding: (holding) =>dispatch(createHolding(holding)),
        updateHolding: (holding) => dispatch(updateHolding(holding)),
        deleteHolding: (holding) => dispatch(deleteHolding(holding)),
        editCurrentUser: (user) => dispatch(editCurrentUser(user)),
    }
)

export default connect(mSTP,mDTP)(StockTransactionForm)