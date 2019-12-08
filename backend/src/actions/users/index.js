const { json } = require('micro');
const { auth } = require('../../libs/auth');
const { userRepository } = require('../../models');
const { response, unauthorized } = require('../../libs/formatters');

const login = async (req, res) => {
    const body = await json(req);
    const result = await auth.check(body);
    
    if (!result) {
        return unauthorized(res, 'Invalid username/password');
    }

    return response(res, { token: auth.encode({ id: result }) });
};

const me = (req, res) => {
    return response(res, userRepository.get(req.user));
};


module.exports = {
    login,
    me
};
