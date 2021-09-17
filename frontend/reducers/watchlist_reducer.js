import {RECEIVE_WATCHLISTS, RECEIVE_WATCHLIST, REMOVE_WATCHLIST} from '../actions/watchlist_actions'

const watchlistsReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_WATCHLISTS:
            return Object.assign(newState, action.watchlists)
        case RECEIVE_WATCHLIST:
            return Object.assign(newState, { [action.watchlist.id]: action.watchlist });
        case REMOVE_WATCHLIST:
            delete newState[action.watchlistId];
            return newState;
        default:
            return newState;
    }
}

export default watchlistsReducer;
