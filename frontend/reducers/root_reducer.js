import {combineReducers} from 'redux'
import sessionsReducer from './session_reducer';
import usersReducer from './users_reducer'
import errors from './session_errors_reducer'



const rootReducer = combineReducers({
  user: usersReducer,
  session: sessionsReducer,
  errors: errors
});

export default rootReducer;
