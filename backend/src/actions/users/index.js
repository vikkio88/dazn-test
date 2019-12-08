const { json } = require('micro');
const { auth } = require('../../libs/auth');
const { response, unauthorized } = require('../../libs/formatters');

const login = async (req, res) => {
    const body = await json(req);
    const result = await auth.check(body);
    
    if (!result) {
        return unauthorized(res, 'Invalid username/password');
    }

    return response(res, { token: auth.encode({ username: body.username }) });
};

const me = (req, res) => {
    return response(res, { user: req.user });
};


module.exports = {
    login,
    me
};
