const pool = require('../configs/connectDB');
const uniqid = require('uniqid');

const postLichLamViecService = async (req, res) => {
  const { maND, thang, nam, lich } = req.body;
  const uniId = uniqid();

  try {
    await pool.execute(
      'INSERT INTO tbllichlamviec(maLich, maND, thang, nam, lich,trangThai) VALUES (?,?,?,?,?,?)',
      [uniId, maND, thang, nam, lich, 0]
    );
    return res.status(200).json({
      message: 'Thêm lịch làm việc thành công',
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
const editLichLamViecService = async (req, res) => {
  const { maND, thang, nam, lich, trangThai } = req.body;

  try {
    await pool.execute(
      'Update tbllichlamviec set lich=?, trangThai=? where maND=? and thang=? and nam=?',
      [lich, trangThai, maND, thang, nam]
    );
    return res.status(200).json({
      message: 'Chỉnh sửa lịch làm việc thành công',
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getLichLamViecService = async (req, res) => {
  const { maND, thang, nam } = req.query;
  try {
    const [rows, field] = await pool.execute(
      'SELECT * from tbllichlamviec where maND=? and thang=? and nam=?',
      [maND, thang, nam]
    );
    return res.status(200).json({
      message: 'Get lịch làm việc thành công',
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getAllLichLamViecService = async (req, res) => {
  try {
    const [rows, field] = await pool.execute(
      'SELECT * from tbllichlamviec, tblnguoidung,tblbacsi, tblkhoa where tbllichlamviec.maND = tblnguoidung.maND and tblbacsi.maND = tblnguoidung.maND and tblkhoa.maKhoa = tblbacsi.maKhoa'
    );
    return res.status(200).json({
      message: 'Get lịch làm việc thành công',
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
const acceptLichLamViecService = async (req, res) => {
  try {
    const [rows, field] = await pool.execute(
      'UPDATE tbllichlamviec set trangThai=?, lydohuy=? where maND=? and thang=?',
      [
        req.params.trangThai,
        req.params.lydohuy,
        req.params.maND,
        req.params.thang,
      ]
    );
    return res.status(200).json({
      message: 'Cập nhật lịch thành công',
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getLichLamViecByMonthService = async (req, res) => {
  const { thang, maND } = req.query;
  console.log(req.query);
  try {
    const [rows, field] = await pool.execute(
      'select * from tbllichlamviec where thang=? and maND=?',
      [thang, maND]
    );
    return res.status(200).json({
      message: 'Get Success',
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  postLichLamViecService,
  editLichLamViecService,
  getLichLamViecService,
  getAllLichLamViecService,
  acceptLichLamViecService,
  getLichLamViecByMonthService,
};
