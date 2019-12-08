import { setSession, userService } from 'libs/api';
import { cache } from 'libs';
import { CACHE_KEYS } from 'const';

export const LOGGED_IN = 'logged_in';
export const LOGGED_OUT = 'logged_out';

export const checkExistingSession = () => {
    return dispatch => {
        const existingSession = cache.get(CACHE_KEYS.SESSION);
        if (existingSession) {
            const { user, token } = existingSession;
            setSession(token);
            dispatch(loggedIn(user, token));
        }
    };
}


export const login = (email, password) => {
    return dispatch => {
        userService.login({ email, password }).then(({ data }) => {
            const { user, token } = data.payload;
            dispatch(loggedIn(user, token));
        }).catch(error => {
            console.error(error);
        });
    }
}

export const loggedIn = (user, token) => {
    setSession(token);
    cache.set(CACHE_KEYS.SESSION, { user, token });
    return {
        type: LOGGED_IN,
        data: {
            user,
            token
        }
    };
}

export const loggedOut = () => {
    cache.forget(CACHE_KEYS.SESSION);
    return {
        type: LOGGED_OUT
    };
}