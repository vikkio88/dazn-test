require('dotenv').config();
const cors = require('micro-cors')();
const { send } = require('micro');
const { router, get, post } = require('microrouter');

const { users, misc } = require('./actions')
const { authguard } = require('./middlewares');


module.exports = cors(router(
    get('/ping', misc.pong),

    post('/login', users.login),
    get('/me', authguard(users.me)),
    


    get('/', misc.fallback),

    get('/*', (req, res) => send(res, 404)),
    post('/*', (req, res) => send(res, 404)),
));