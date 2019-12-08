const { streams } = require('./__mocks__');
const catalogRepository = {
    getLive() {
        return Object.values(streams);
    },
    getStreamById(streamId) {
        if (streamId in streams) return streams[streamId];
        return null;
    }
};

module.exports = {
    catalogRepository
};