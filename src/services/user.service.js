const uniqid = require('uniqid');
const pool = require('../configs/connectDB');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const registerService = async (body, res) => {
  let { phone, password, email, fullName, maQuyen } = body;
  console.log(body);
  const uniId = uniqid();

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      await pool.execute(
        'INSERT INTO tblnguoidung(maND, hoTen, SDT, email, maQuyen,matKhau) VALUES (?,?,?,?,?,?)',
        [uniId, fullName, phone, email, maQuyen, hash]
      );

      return res.json({
        status: 'OK',
        message: 'Đăng ký tài khoản thành công',
      });
    } catch (error) {
      console.log(error.sqlMessage);
      return res.json({
        status: 'Failed',
        message: error.sqlMessage,
      });
    }
  });
};

const loginService = async (body, res) => {
  let { phone, password } = body;
  try {
    const [rows, fields] = await pool.execute(
      `select * from tblnguoidung where SDT = ${phone}`
    );
    if (rows.length > 0) {
      const match = await bcrypt.compare(
        password,
        String(rows[0].matKhau).trim()
      );
      console.log(match, rows[0].matKhau, password);
      if (match) {
        const { password, ...user } = rows[0];

        return res
          .status(200)
          .json({ status: 'OKE', message: 'Đăng nhập thành công', user: user });
      } else {
        return res
          .status(400)
          .json({ status: 'Failed', message: 'Mật khẩu sai. Hãy xem lại' });
      }
    } else {
      return res
        .status(400)
        .json({ status: 'Failed', message: 'Không tìm thấy tài khoản.' });
    }
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const addProfileDoctor = async (req, res) => {
  let { maND } = req.params;
  const { chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac } = req.body;

  try {
    await pool.execute(
      'INSERT INTO tblbacsi(chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac, maND) VALUES (?,?,?,?,?)',
      [chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac, maND]
    );
    console.log(req.body, maND);
    return res.json({
      status: 'OK',
      message: 'Thêm thông tin bác sĩ khoản thành công',
    });
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const editProfileDoctor = async (req, res) => {
  let { maND } = req.params;
  const { chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac } = req.body;

  try {
    await pool.execute(
      'UPDATE tblbacsi set chuyenNganh = ?, truongTotNghiep= ?, kinhNghiem= ?, lyLichCongTac= ? where maND = ?',
      [chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac, maND]
    );
    return res.json({
      status: 'OK',
      message: 'Cập nhật thông tin bác sĩ khoản thành công',
    });
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const editProfileUserService = async (req, res) => {
  let { maND } = req.params;
  console.log(req.body, maND);
  const { hoTen, SDT, CMND, email, gioiTinh, diaChi, ngheNghiep, ngaySinh } =
    req.body;

  try {
    await pool.execute(
      'UPDATE tblnguoidung set ngaySinh= ?, hoTen = ?, SDT= ?, CMND= ?, email= ?, gioiTinh= ?, diaChi= ?, ngheNghiep= ? where maND = ?',
      [ngaySinh, hoTen, SDT, CMND, email, gioiTinh, diaChi, ngheNghiep, maND]
    );
    const [rows, field] = await pool.execute(
      `select * from tblnguoidung where maND = '${maND}'`
    );
    return res.json({
      status: 'OK',
      message: 'Cập nhật thông tin người dùng thành công',
      user: rows,
    });
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const getProfileDoctor = async (req, res) => {
  let { maND } = req.params;

  try {
    const [rows, fields] = await pool.execute(
      `select * from tblbacsi where maND = '${maND}'`
    );
    console.log(req.body, maND);
    return res.json({
      status: 'OK',
      message: 'Get thông tin bác sĩ thành công',
      data: rows,
    });
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const getAllUserService = async (req, res) => {
  try {
    const [rows, field] = await pool.execute(
      `select * from tblnguoidung, tblquyen where tblnguoidung.maQuyen = tblquyen.maQuyen`
    );
    return res.json({
      status: 'OK',
      message: 'Danh sách người dùng',
      users: rows,
      totalData: rows.length,
    });
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

module.exports = {
  registerService,
  loginService,
  addProfileDoctor,
  editProfileDoctor,
  getProfileDoctor,
  editProfileUserService,
  getAllUserService,
};
