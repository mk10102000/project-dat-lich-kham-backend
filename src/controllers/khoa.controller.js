const { getKhoaService } = require('../services/khoa.service');

const getKhoaController = async (req, res) => {
  await getKhoaService(res);
};

module.exports = {
  getKhoaController,
};
