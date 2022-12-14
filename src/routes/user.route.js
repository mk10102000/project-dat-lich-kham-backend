const {
  registerController,
  loginController,
  addProfileController,
  editProfileController,
  getProfileDoctorController,
  editProfileUserController,
  getAllUserController,
} = require('../controllers/user.controler');

function userApi(router) {
  router.post('/register', registerController);
  router.post('/login', loginController);

  router.post('/add-profile-doctor/:maND', addProfileController);
  router.put('/edit-profile-doctor/:maND', editProfileController);
  router.put('/edit-profile-user/:maND', editProfileUserController);

  router.get('/get-profile-doctor/:maND', getProfileDoctorController);
  router.get('/get-all-user', getAllUserController);
}
module.exports = userApi;
