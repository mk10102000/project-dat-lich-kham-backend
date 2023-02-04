const {
  registerService,
  loginService,
  editProfileDoctor,
  editProfileUserService,
  addProfileDoctor,
  getProfileDoctor,
  getAllUserService,
  editRoleService,
  countNguoiDung,
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
const editRoleController = async (req, res) => {
  await editRoleService(req, res);
};
const countNguoiDungController = async (req, res) => {
  await countNguoiDung(req, res);
};

module.exports = {
  registerController,
  loginController,
  addProfileController,
  editProfileController,
  getProfileDoctorController,
  editProfileUserController,
  getAllUserController,
  editRoleController,
  countNguoiDungController,
};
