const { assert } = require('chai');
const { streamProtection } = require('../../src/libs/services');

describe('Stream Protection tests', () => {
    const user = { maxStreams: 3 };
    const streamId = 'someId';

    it('does allow a user to get a stream if he is not streaming anything', () => {
        assert.isTrue(streamProtection.canPlay(user, streamId));
    });

    it('does not allow a user to get a stream if he is streaming his threshold', () => {
        assert.isFalse(streamProtection.canPlay(user, streamId));
    });

});