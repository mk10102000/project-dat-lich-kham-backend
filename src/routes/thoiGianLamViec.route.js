const {
  getThoiGianLamViecController, getLichLamViecBacSiController,
} = require('../controllers/thoiGianLamViec.controller');

function thoiGianApi(router) {
  router.get('/thoi-gian', getThoiGianLamViecController);
  router.get(`/lich-lam-viec/:maND`, getLichLamViecBacSiController);
}

module.exports = thoiGianApi;
