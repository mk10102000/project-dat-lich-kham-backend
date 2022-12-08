const {
  registerService,
  loginService,
  editProfileDoctor,
  addProfileDoctor,
  getProfileDoctor,
} = require('../services/user.service');

const registerController = async (req, res) => {
  await registerService(req.body, res);
};
const loginController = async (req, res) => {
  await loginService(req.body, res);
};

const addProfileController = async (req, res) => {
  await addProfileDoctor(req, res);
};
const editProfileController = async (req, res) => {
  await editProfileDoctor(req, res);
};

const getProfileDoctorController = async (req, res) => {
  await getProfileDoctor(req, res);
};

module.exports = {
  registerController,
  loginController,
  addProfileController,
  editProfileController,
  getProfileDoctorController,
};
