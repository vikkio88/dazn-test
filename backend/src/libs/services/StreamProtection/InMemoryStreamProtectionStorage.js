const StreamProtectionStorageDriver = require('./StreamProtectionStorageDriver');

// Read also the comment on StreamProtectionStorageDriver.js

/**
 * This class is the driver I decided to use for the purpose of this test
 * In a production environment I would probably use Redis or similar.
 * 
 * This cannot be used in production as it wont scale very well, if 
 * this app would be replicated in many instances the information would be
 * stored in different machines, so this wont be a sigle source of truth, as 
 * the load balancer would decide which instance you would be redirected too
 */
class InMemoryStreamProtectionStorage extends StreamProtectionStorageDriver {
    constructor() {
        super();
        this.streams = {};
    }
    registerStream(userId, streamId) {
        if (userId in this.streams) {
            this.streams[userId].push(streamId);
        } else {
            this.streams[userId] = [streamId];
        }

        return this.streams[userId].length > 0;
    }

    removeStream(userId, streamId) {
        if (userId in this.streams) {
            this.streams[userId] = this.streams[userId].filter(s => s !== streamId);
        }

        return true;
    }

    getPlayingStreamsForUser(userId) {
        if (userId in this.streams) {
            return this.streams[userId];
        }

        return [];
    }
}

module.exports = InMemoryStreamProtectionStorage;