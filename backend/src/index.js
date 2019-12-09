require('dotenv').config();
const cors = require('micro-cors')();
const { send } = require('micro');
const { router, get, post, del } = require('microrouter');

const { users, misc, catalog } = require('./actions')
const { authguard } = require('./middlewares');


module.exports = cors(router(
    get('/ping', misc.pong),

    post('/login', users.login),
    get('/me', authguard(users.me)),
    get('/me/slots', authguard(catalog.getSlots)),
    
    get('/catalog/live', catalog.live),
    get('/catalog/stream/:streamId', authguard(catalog.getStream)),
    del('/catalog/stream/:streamId/slot', authguard(catalog.releaseStreamSlot)),

    get('/', misc.fallback),

    get('/*', (req, res) => send(res, 404)),
    post('/*', (req, res) => send(res, 404)),
));