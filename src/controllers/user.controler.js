const {
  registerService,
  loginService,
  editProfileDoctor,
  editProfileUserService,
  addProfileDoctor,
  getProfileDoctor,
  getAllUserService,
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

const editProfileUserController = async (req, res) => {
  await editProfileUserService(req, res);
};

const getAllUserController = async (req, res) => {
  await getAllUserService(req, res);
};

module.exports = {
  registerController,
  loginController,
  addProfileController,
  editProfileController,
  getProfileDoctorController,
  editProfileUserController,
  getAllUserController,
};
