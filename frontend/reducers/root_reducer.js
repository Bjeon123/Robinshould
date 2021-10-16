import {combineReducers} from 'redux'
import sessionsReducer from './session_reducer';
import usersReducer from './users_reducer';
import watchlistsReducer from './watchlist_reducer'
import holdingsReducer from './holdings_reducer';
import errorsReducer from './errors_reducer';
import themeReducer from './theme_reducer'



const rootReducer = combineReducers({
  user: usersReducer,
  watchlists: watchlistsReducer,
  session: sessionsReducer,
  errors: errorsReducer,
  theme: themeReducer
});

export default rootReducer;
