const StreamProtection = require('./StreamProtection/StreamProtection');
const InMemoryStreamProtectionStorage = require('./StreamProtection/InMemoryStreamProtectionStorage');

const streamProtection = new StreamProtection(
    new InMemoryStreamProtectionStorage()
);

module.exports = {
    streamProtection
};