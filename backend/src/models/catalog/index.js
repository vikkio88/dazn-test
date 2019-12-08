const { items, streams } = require('./__mocks__');
const catalogRepository = {
    getLive() {
        return items;
    },
    getFileUrl(streamId) {
        if (streamId in streams) return streams[streamId];
        return null;
    }
};

module.exports = {
    catalogRepository
};