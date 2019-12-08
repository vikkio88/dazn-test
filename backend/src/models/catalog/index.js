const { items } = require('./__mocks__');
const catalogRepository = {
    getLive() {
        return items;
    }
};

module.exports = {
    catalogRepository
};