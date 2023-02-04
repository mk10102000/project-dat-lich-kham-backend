const pool = require('../configs/connectDB');
const uniqid = require('uniqid');

const postBaiDangService = async (req, res) => {
  const { filename } = req.file;
  const { tieude, mota, maND, noidung } = req.body;

  const uniId = uniqid();
  const image = `https://dat-lich-kham.onrender.com/${filename}`;
  const ngaydang = new Date();

  try {
    await pool.execute(
      'INSERT INTO tblbaidang(mabaidang,maND, tieude, mota, anh, noidung, ngaydang) VALUES (?,?,?,?,?,?,?)',
      [uniId, maND, tieude, mota, image, noidung, ngaydang]
    );
    return res.status(200).json({
      status: 200,
      message: 'Đăng bài viết thành công',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Lỗi đăng bài',
    });
  }
};

const eidtBaiDangService = async (req, res) => {
  const { tieude, mota, noidung, maND } = req.body;
  const { id } = req.params;
  if (req.file) {
    const image = `https://dat-lich-kham.onrender.com/${req.file.filename}`;
    try {
      await pool.execute(
        `UPDATE tblbaidang set tieude= ?, mota= ?, anh= ?, noidung= ? WHERE mabaidang= ? and maND= ?`,
        [tieude, mota, image, noidung, id, maND]
      );
      return res.status(200).json({
        status: 200,
        message: 'Chỉnh sửa bài đăng thành công',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: 'Lỗi chỉnh đăng bài',
      });
    }
  } else {
    try {
      await pool.execute(
        `UPDATE tblbaidang set tieude= ?, mota= ?, noidung= ? WHERE mabaidang= ? and maND= ?`,
        [tieude, mota, noidung, id, maND]
      );
      return res.status(200).json({
        status: 200,
        message: 'Chỉnh sửa bài đăng thành công',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: 'Lỗi chỉnh đăng bài',
      });
    }
  }
};

const getTatCaBaiDangService = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute(
      `SELECT mabaidang, tieude,noidung,anh,hoten, mota, ngaydang from tblbaidang, tblnguoidung where tblbaidang.maND = tblnguoidung.maND`
    );
    return res.status(200).json({
      status: 200,
      posts: rows,
      message: 'Lấy bài viết thành công',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Lỗi lấy bài viết',
    });
  }
};

const getChiTietBaiDangService = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = await pool.execute(
      `SELECT mabaidang, tieude,noidung,anh,hoten, mota, ngaydang from tblbaidang, tblnguoidung where tblbaidang.maND = tblnguoidung.maND and mabaidang = '${id}'`
    );
    return res.status(200).json({
      status: 200,
      post: rows[0],
      message: 'Lấy chi tiết thành công',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Lỗi lấy bài viết chi tiết',
    });
  }
};

const deletePostService = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = await pool.execute(
      `DELETE from tblbaidang where mabaidang = '${id}'`
    );
    return res.status(200).json({
      status: 200,
      message: 'Xóa bài đăng thành công',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Xóa bài đăng',
    });
  }
};

module.exports = {
  postBaiDangService,
  getTatCaBaiDangService,
  getChiTietBaiDangService,
  eidtBaiDangService,
  deletePostService,
};
