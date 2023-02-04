const {
  postLichLamViecController,
  getLichLamViecController,
  editLichLamViecController,
  getAllLichLamViecController,
  acceptLichLamViecController,
  getLichLamViecByMonthController,
} = require('../controllers/lichLamViec.controller');

function lichLamViecApi(router) {
  router.post(`/them-lich-lam-viec-user`, postLichLamViecController);
  router.put(`/edit-lich-lam-viec-user`, editLichLamViecController);
  router.get(`/get-lich-lam-viec-user`, getLichLamViecController);
  router.get(`/get-all-lich-lam-viec-user`, getAllLichLamViecController);
  router.get(`/get-lich-lam-viec-month`, getLichLamViecByMonthController);

  router.put(
    `/accept-calender/:maND/:trangThai/:thang/:lydohuy`,
    acceptLichLamViecController
  );
}

module.exports = lichLamViecApi;
