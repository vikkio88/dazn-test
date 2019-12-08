const { response } = require('../../libs/formatters');
const { catalogRepository } = require('../../models');

const live = async (req, res) => {
    const catalog = catalogRepository.getLive();
    return response(res, {catalog});
};



module.exports = {
    live
};