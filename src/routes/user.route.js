const {
  registerController,
  loginController,
  addProfileController,
  editProfileController,
  getProfileDoctorController,
} = require('../controllers/user.controler');

function userApi(router) {
  router.post('/register', registerController);
  router.post('/login', loginController);
  router.post('/add-profile-doctor/:maND', addProfileController);
  router.put('/edit-profile-doctor/:maND', editProfileController);
  router.get('/get-profile-doctor/:maND', getProfileDoctorController);
  //   router.post('/token', userController.getToken);
}
module.exports = userApi;
