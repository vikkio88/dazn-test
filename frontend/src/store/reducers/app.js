import { LOGGED_IN, LOGGED_OUT, LOGIN_ERROR } from '../actions/app';

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
                ...action.data,
                error: null
            };
        case LOGGED_OUT:
            return {
                ...state,
                user: null,
                token: null,
                error: null
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: 'Login Error',
                user: null,
                token: null
            };
        default:
            return state;
    }
}