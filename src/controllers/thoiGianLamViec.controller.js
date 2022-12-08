const {
  getThoiGianLamViec,
  getLichLamViecBacSi,
} = require('../services/thoiGianLamViec.service');

const getThoiGianLamViecController = async (req, res) => {
  await getThoiGianLamViec(res);
};

const getLichLamViecBacSiController = async (req, res) => {
  await getLichLamViecBacSi(req, res);
};
const loginController = async (req, res) => {
  await loginService(req.body, res);
};

module.exports = {
  getThoiGianLamViecController,
  getLichLamViecBacSiController,
};
