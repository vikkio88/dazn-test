import { LOGGED_IN, LOGGED_OUT } from '../actions/app';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                ...action.data
            };
        case LOGGED_OUT:
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }
}