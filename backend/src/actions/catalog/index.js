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
        const stream = catalogRepository.getStreamById(streamId);
        if (!stream) return notFound(res, `Stream not found '${streamId}'`);
        return response(res, stream);
    }

    return forbidden(res, `Your current plan (${user.plan}) allows you only to stream ${user.maxStreams} videos concurrently.`);
};

const releaseStreamSlot = async (req, res) => {
    const user = userRepository.get(req.user);
    const { streamId } = req.params;
    streamProtection.releaseStream(user.id, streamId);

    return response(res, { status: 'ok' });
}

const getSlots = async (req, res) => {
    const user = userRepository.get(req.user);
    return response(res, streamProtection.driver.getPlayingStreamsForUser(user.id));
}

module.exports = {
    live,
    getStream,
    releaseStreamSlot,
    getSlots
};