const { response, forbidden, notFound } = require('../../libs/formatters');
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
        if (!fileUrl) return notFound(res, `Stream not found '${streamId}'`);
        return response(res, { fileUrl });
    }

    return forbidden(res, `Your current plan (${user.plan}) allows you only to stream ${user.maxStreams} videos concurrently.`);
};

module.exports = {
    live,
    getStream
};