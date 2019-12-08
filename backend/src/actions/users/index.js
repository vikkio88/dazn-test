const { json } = require('micro');
const { auth } = require('../../libs/auth');
const { userRepository } = require('../../models');
const { response, unauthorized } = require('../../libs/formatters');

const login = async (req, res) => {
    const body = await json(req);
    const userId = await auth.check(body);

    if (!userId) {
        return unauthorized(res, 'Invalid username/password');
    }

    const user = userRepository.get({ id: userId })

    return response(res, { token: auth.encode({ id: userId }), user });
};

const me = (req, res) => {
    return response(res, userRepository.get(req.user));
};


module.exports = {
    login,
    me
};
