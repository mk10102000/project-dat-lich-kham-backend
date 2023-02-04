const uniqid = require('uniqid');
const pool = require('../configs/connectDB');
const bcrypt = require('bcrypt');
const e = require('express');

const saltRounds = 10;
const registerService = async (body, res) => {
  let { phone, password, email, fullName, maQuyen } = body;
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
  const { filename } = req.file;

  let { maND } = req.params;
  const { chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac, maKhoa } =
    req.body;
  const image = `https://dat-lich-kham.onrender.com/${filename}`;

  try {
    await pool.execute(
      'INSERT INTO tblbacsi(chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac,maKhoa, maND,avatar) VALUES (?,?,?,?,?,?,?)',
      [
        chuyenNganh,
        truongTotNghiep,
        kinhNghiem,
        lyLichCongTac,
        maKhoa,
        maND,
        image,
      ]
    );
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
  const { chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac, maKhoa } =
    req.body;

  console.log(req.body);
  if (req.file) {
    const image = `https://dat-lich-kham.onrender.com/${req.file.filename}`;
    console.log(image);
    try {
      await pool.execute(
        'UPDATE tblbacsi set chuyenNganh = ?, truongTotNghiep= ?, kinhNghiem= ?, lyLichCongTac= ?, maKhoa= ?, avatar= ? where maND = ?',
        [
          chuyenNganh,
          truongTotNghiep,
          kinhNghiem,
          lyLichCongTac,
          maKhoa,
          image,
          maND,
        ]
      );
      return res.json({
        status: 'OK',
        message: 'Cập nhật thông tin bác sĩ khoản thành công',
      });
    } catch (error) {
      return res.status(404).json({ err: error });
    }
  } else {
    try {
      await pool.execute(
        'UPDATE tblbacsi set chuyenNganh = ?, truongTotNghiep= ?, kinhNghiem= ?, lyLichCongTac= ?, maKhoa= ? where maND = ?',
        [chuyenNganh, truongTotNghiep, kinhNghiem, lyLichCongTac, maKhoa, maND]
      );
      return res.json({
        status: 'OK',
        message: 'Cập nhật thông tin bác sĩ khoản thành công',
      });
    } catch (error) {
      return res.status(404).json({ err: error });
    }
  }
};

const editProfileUserService = async (req, res) => {
  let { maND } = req.params;
  const { hoTen, SDT, email, gioiTinh, ngheNghiep, ngaySinh } = req.body;

  try {
    await pool.execute(
      'UPDATE tblnguoidung set ngaySinh= ?, hoTen = ?, SDT= ?, email= ?, gioiTinh= ?, ngheNghiep= ? where maND = ?',
      [ngaySinh, hoTen, SDT, email, gioiTinh, ngheNghiep, maND]
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
const editRoleService = async (req, res) => {
  let { maND, maQuyen } = req.body;

  try {
    await pool.execute('UPDATE tblnguoidung set maQuyen= ? where maND = ?', [
      maQuyen,
      maND,
    ]);
    const [rows, field] = await pool.execute(
      `select * from tblnguoidung where maND = '${maND}'`
    );
    return res.json({
      status: 'OK',
      message: 'Cập nhật quyền người dùng thành công',
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
  const { role } = req.query;
  try {
    if (role) {
      const [rows, field] = await pool.execute(
        `select * from tblnguoidung, tblquyen, tblbacsi, tblkhoa
        where tblnguoidung.maQuyen = tblquyen.maQuyen and tblnguoidung.maQuyen='${role}' and tblbacsi.maND = tblnguoidung.maND and tblkhoa.maKhoa = tblbacsi.maKhoa`
      );
      return res.json({
        status: 'OK',
        message: 'Danh sách người dùng',
        users: rows,
        totalData: rows.length,
      });
    } else {
      const [rows, field] = await pool.execute(
        `select * from tblnguoidung, tblquyen where tblnguoidung.maQuyen = tblquyen.maQuyen`
      );
      return res.json({
        status: 'OK',
        message: 'Danh sách người dùng',
        users: rows,
        totalData: rows.length,
      });
    }
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const countNguoiDung = async (res) => {
  console.log('test');
  try {
    const [rows, fields] = await pool.execute(`SELECT * from tblnguoidung`);
    return res.status(200).json({
      total: rows.length,
    });
  } catch (error) {}
};

module.exports = {
  registerService,
  loginService,
  addProfileDoctor,
  editProfileDoctor,
  getProfileDoctor,
  editProfileUserService,
  getAllUserService,
  editRoleService,
  countNguoiDung,
};
