import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000
});

export const setSession = token => axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;



export const userService = {
    login({ username, password }) {
        return axiosInstance.post('login', { username, password });
    },

    me() {
        return axiosInstance.get('me');
    }
};

export const catalogService = {
    getLive() {
        return axiosInstance.get('catalog/live');
    },
    getStream(streamId) {
        return axiosInstance.get(`/catalog/stream/${streamId}`);
    }
}