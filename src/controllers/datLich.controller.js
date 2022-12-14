const {
  getChoDatLichService,
  postDatLichService,
  getPhieuKhamUserService,
  getAllDatLichService,
  editDatLichService,
} = require('../services/datLich.service');

const getChoDatLichController = async (req, res) => {
  await getChoDatLichService(req, res);
};
const postDatLichControlller = async (req, res) => {
  await postDatLichService(req, res);
};

const getPhieuKhamUserController = async (req, res) => {
  await getPhieuKhamUserService(req, res);
};

const getAllDatLichController = async (req, res) => {
  await getAllDatLichService(req, res);
};
const editDatLichController = async (req, res) => {
  await editDatLichService(req, res);
};

module.exports = {
  getChoDatLichController,
  postDatLichControlller,
  getPhieuKhamUserController,
  getAllDatLichController,
  editDatLichController
};
