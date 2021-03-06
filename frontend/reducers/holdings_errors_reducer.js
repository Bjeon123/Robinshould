import { RECEIVE_HOLDING_ERRORS,CLEAR_ERRORS} from '../actions/holding_actions';

const holdingsErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HOLDING_ERRORS:
            return action.errors;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
};

export default holdingsErrorsReducer;