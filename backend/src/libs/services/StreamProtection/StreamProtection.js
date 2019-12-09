class StreamProtection {
    /**
     * 
     * @param {StreamProtectionStorageDriver} driver 
     */
    constructor(driver) {
        this.driver = driver;
    }

    releaseStream(userId, streamId) {
        return this.driver.removeStream(userId, streamId);
    }

    registerStream(userId, streamId) {
        return this.driver.registerStream(userId, streamId);
    }

    canPlay(user, streamId) {
        const { id: userId, maxStreams } = user;
        const playingStreams = this.driver.getPlayingStreamsForUser(userId);
        if (playingStreams.indexOf(streamId) > -1) {
            return true;
        }

        if (playingStreams.length + 1 > maxStreams) {
            return false;
        }

        return this.registerStream(userId, streamId);
    }
}

module.exports = StreamProtection;