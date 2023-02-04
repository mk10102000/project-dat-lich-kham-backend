const {
  getChoDatLichController,
  postDatLichControlller,
  getPhieuKhamUserController,
  getAllDatLichController,
  editDatLichController,
  getDatLichByMaThoiGianController,
  editNoteDatLichController,
  countKhamThanhCongController,
} = require('../controllers/datLich.controller');

function datLichApi(router) {
  router.get('/dat-lich', getChoDatLichController);
  router.get('/dat-lich-user/:maND', getPhieuKhamUserController);

  router.get('/all-dat-lich', getAllDatLichController);
  router.get('/get-dat-lich-by-thoi-gian', getDatLichByMaThoiGianController);
  router.get('/count-datlich', countKhamThanhCongController);
  router.post('/dat-lich', postDatLichControlller);

  router.put('/confirm-dat-lich', editDatLichController);
  router.put('/edit-note', editNoteDatLichController);
}

module.exports = datLichApi;
