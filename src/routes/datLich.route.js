const {
  getChoDatLichController,
  postDatLichControlller,
  getPhieuKhamUserController,
  getAllDatLichController,
  editDatLichController,
} = require('../controllers/datLich.controller');

function datLichApi(router) {
  router.get('/dat-lich', getChoDatLichController);
  router.get('/dat-lich-user/:maND', getPhieuKhamUserController);

  router.get('/all-dat-lich', getAllDatLichController);
  router.post('/dat-lich', postDatLichControlller);

  router.put('/confirm-dat-lich', editDatLichController);
}

module.exports = datLichApi;
