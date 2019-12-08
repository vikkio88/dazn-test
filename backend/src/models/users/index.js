const { USERNAME, PASSWORD, USER_ID } = process.env;

const { users } = require('./__mocks__');

const userRepository = {
    login(username, password) {
        if (username === USERNAME && password === PASSWORD) {
            return USER_ID;
        }

        return false;
    },
    get({ id }) {
        return users[id] || null;
    }
};

module.exports = {
    userRepository
}