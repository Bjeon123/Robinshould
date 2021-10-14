import { combineReducers } from 'redux';
import HoldingErrorsReducer from './holdings_errors_reducer'
import SessionErrorsReducer from './session_errors_reducer'

export default combineReducers({
    sessions: SessionErrorsReducer,
    holdings: HoldingErrorsReducer
})