const { response } = require('../../libs/formatters');
const { catalogRepository } = require('../../models');

const live = async (req, res) => {
    return response(res, catalogRepository.getLive());
};



module.exports = {
    live
};