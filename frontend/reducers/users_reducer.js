import {SET_CURRENT_USER} from '../actions/users_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case SET_CURRENT_USER:
            return Object.assign({},action.currentUser);
        default:
            return state;
    }
};

export default usersReducer;
