const jwt = require('jwt-simple');
const dayjs = require('dayjs');

const { userRepository } = require('../../models');

const { JWT_SECRET, JWT_TTL } = process.env;

const auth = {
    check({ username, password }) {
        console.log(`stuff: ${username},${password}`);
        return userRepository.login(username, password)
    },
    encode(user) {
        return jwt.encode({ user, expires: dayjs().unix() + JWT_TTL }, JWT_SECRET);
    },
    decode(token) {
        token = token.replace('Bearer ', '');
        return jwt.decode(token, JWT_SECRET);
    }

}
module.exports = {
    auth
}