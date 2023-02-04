const {
  registerController,
  loginController,
  addProfileController,
  editProfileController,
  getProfileDoctorController,
  editProfileUserController,
  getAllUserController,
  editRoleController,
  countNguoiDungController,
} = require('../controllers/user.controler');
const upload = require('../middlewares/uploadImage');

function userApi(router) {
  router.post('/register', registerController);
  router.post('/login', loginController);

  router.post(
    '/add-profile-doctor/:maND',
    upload.single('avatar'),
    addProfileController
  );
  router.put(
    '/edit-profile-doctor/:maND',
    upload.single('avatar'),
    editProfileController
  );
  router.put('/edit-profile-user/:maND', editProfileUserController);
  router.put('/edit-role', editRoleController);

  router.get('/get-profile-doctor/:maND', getProfileDoctorController);
  router.get('/get-all-user', getAllUserController);
  router.get('/count-all-user', countNguoiDungController);
}
module.exports = userApi;
