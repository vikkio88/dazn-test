/**
 * This is an interface for a StorageDriver class
 * this will be the heart of the business logic
 * it needs to be fast to access and easy to manage.
 * 
 */

class StreamProtectionStorageDriver {
    /**
     * 
     * @param {String} userId
     * @returns {array} list of streams 
     */
    getPlayingStreamsForUser(userId) {
        return [];
    }

    /**
     * 
     * @param {string} userId 
     * @param {string} streamId
     * @returns {Boolean} whether the stream was registered correctly 
     */
    registerStream(userId, streamId) {
        return false
    }

    /**
     * 
     * @param {string} userId 
     * @param {string} streamId 
     * @returns {Boolean} whether the stream was removed correctly
     */

    removeStream(userId, streamId) {
        return true;
    }
}

module.exports = StreamProtectionStorageDriver;