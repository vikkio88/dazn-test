const { response, unprocessable } = require('../../libs/formatters');
const { streamProtection } = require('../../libs/services');
const { catalogRepository, userRepository } = require('../../models');

const live = async (req, res) => {
    return response(res, catalogRepository.getLive());
};

const getStream = async (req, res) => {
    const user = userRepository.get(req.user);
    const { streamId } = req.params;
    if (streamProtection.canPlay(user, streamId)) {
        const fileUrl = catalogRepository.getFileUrl(streamId);
        return response(res, { fileUrl });
    }

    return unprocessable(res, `You are already playing ${user.maxStreams} videos`);
};

module.exports = {
    live,
    getStream
};