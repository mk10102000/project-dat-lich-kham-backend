const { getKhoaController } = require('../controllers/khoa.controller');

function khoaApi(router) {
  router.get('/khoa', getKhoaController);
}

module.exports = khoaApi;
