const {
  postLichLamViecService,
  getLichLamViecService,
  editLichLamViecService,
  getAllLichLamViecService,
  acceptLichLamViecService,
  getLichLamViecByMonthService,
} = require('../services/lichLamViec.service');

const postLichLamViecController = async (req, res) => {
  await postLichLamViecService(req, res);
};
const editLichLamViecController = async (req, res) => {
  await editLichLamViecService(req, res);
};

const getLichLamViecController = async (req, res) => {
  await getLichLamViecService(req, res);
};
const getAllLichLamViecController = async (req, res) => {
  await getAllLichLamViecService(req, res);
};
const acceptLichLamViecController = async (req, res) => {
  await acceptLichLamViecService(req, res);
};
const getLichLamViecByMonthController = async (req, res) => {
  await getLichLamViecByMonthService(req, res);
};

module.exports = {
  postLichLamViecController,
  getLichLamViecController,
  editLichLamViecController,
  getAllLichLamViecController,
  acceptLichLamViecController,
  getLichLamViecByMonthController,
};
