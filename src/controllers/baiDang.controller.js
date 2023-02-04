const {
  postBaiDangService,
  getTatCaBaiDangService,
  getChiTietBaiDangService,
  eidtBaiDangService,
  deletePostService,
} = require('../services/baiDang.service');

const postBaiDangController = async (req, res) => {
  await postBaiDangService(req, res);
};
const editBaiDangController = async (req, res) => {
  await eidtBaiDangService(req, res);
};

const getTatCaBaiDangController = async (req, res) => {
  await getTatCaBaiDangService(req, res);
};
const getChiTietBaiDangController = async (req, res) => {
  await getChiTietBaiDangService(req, res);
};
const deletePostController = async (req, res) => {
  await deletePostService(req, res);
};

module.exports = {
  postBaiDangController,
  editBaiDangController,
  getTatCaBaiDangController,
  getChiTietBaiDangController,
  deletePostController,
};
