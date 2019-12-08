const { assert } = require('chai');
const StreamProtection = require('../../src/libs/services/StreamProtection/StreamProtection');
const InMemoryStreamProtectionStorage = require('../../src/libs/services/StreamProtection/InMemoryStreamProtectionStorage');

describe('Stream Protection tests', () => {
    const user = { id: 'userId', maxStreams: 3 };
    const streamId = 'someId';

    it('does allow a user to get a stream if he is not streaming anything', () => {
        const streamProtection = new StreamProtection(new InMemoryStreamProtectionStorage());
        assert.isTrue(streamProtection.canPlay(user, streamId));
    });

    it('does not allow a user to get a stream if he is streaming his threshold', () => {
        const streamProtection = new StreamProtection(new InMemoryStreamProtectionStorage());
        streamProtection.driver.registerStream(user.id, 'somestreamId');
        streamProtection.driver.registerStream(user.id, 'somestreamId1');
        streamProtection.driver.registerStream(user.id, 'somestreamId2');
        assert.isFalse(streamProtection.canPlay(user, streamId));
    });
    
    it('does allow a user to get a stream if he stopped streaming one after he reached his threshold', () => {
        const streamProtection = new StreamProtection(new InMemoryStreamProtectionStorage());
        streamProtection.driver.registerStream(user.id, 'somestreamId');
        streamProtection.driver.registerStream(user.id, 'somestreamId1');
        streamProtection.driver.registerStream(user.id, 'somestreamId2');
        assert.isFalse(streamProtection.canPlay(user, streamId));
        streamProtection.driver.removeStream(user.id, 'somestreamId2');
        assert.isTrue(streamProtection.canPlay(user, streamId));
    });

});