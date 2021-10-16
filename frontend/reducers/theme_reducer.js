import {RECEIVE_THEME } from "../actions/theme_actions";

const themeReducer = (state = "green", action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_THEME:
            return action.color;
        default:
            return state;
    }
};

export default themeReducer;