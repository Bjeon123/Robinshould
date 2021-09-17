import {
    RECEIVE_HOLDING,
    REMOVE_HOLDING,
    RECEIVE_HOLDINGS
} from '../actions/holding_actions';

const holdingsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HOLDINGS:
            return Object.assign(state, action.holdings)
        case RECEIVE_HOLDING:
            return Object.assign(state,{[action.holding.id]: holding});
        case REMOVE_HOLDING:
            let nextState = Object.assign({},state)
            delete nextState[action.holding.id]
            return nextState
        default:
            return state;
    }
};

export default holdingsReducer;
