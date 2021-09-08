import * as APIUtil from '../util/user_api.util';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = currentUser => {
    return(
        {
            type: SET_CURRENT_USER,
            currentUser: currentUser
        }
    )
};

export const getCurrentUser = userId => dispatch => {
    return(
        APIUtil.getCurrentUser(userId).then(user => dispatch(setCurrentUser(user)))
    )
}
