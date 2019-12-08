const { send } = require('micro');

const response = (res, payload) => {
    return send(res, 200, payload);
}

const unauthorized = (res, message = 'Unauthorized') => {
    return send(res, 401, {
        message
    });
}

const notFound = (res, message = 'NotFound') => {
    return send(res, 404, {
        message
    });
}

const unprocessable = (res, message = 'Wrong Payload', errors = []) => {
    return send(res, 422, {
        message,
        errors
    });
}

const forbidden = (res, message = 'Resource Forbidden') => {
    return send(res, 403, { message });
}

module.exports = {
    response,
    unauthorized,
    notFound,
    forbidden,
    unprocessable
}