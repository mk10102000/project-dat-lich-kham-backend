const {
  postBaiDangController,
  getTatCaBaiDangController,
  getChiTietBaiDangController,
  editBaiDangController,
  deletePostController,
} = require('../controllers/baiDang.controller');
const upload = require('../middlewares/uploadImage');

function baiDangApi(router) {
  router.post('/new-post', upload.single('thumbnail'), postBaiDangController);
  router.put(
    '/edit-post/:id',
    upload.single('thumbnail'),
    editBaiDangController
  );
  router.get('/get-all-post', getTatCaBaiDangController);
  router.get('/get-detail-post/:id', getChiTietBaiDangController);
  router.delete('/delete-post/:id', deletePostController);
}

module.exports = baiDangApi;
