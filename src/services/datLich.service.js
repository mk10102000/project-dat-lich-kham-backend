const pool = require('../configs/connectDB');

const getChoDatLichService = async (req, res) => {
  const { ngayDatLich } = req.query;
  const [rows, fields] = await pool.execute(
    `SELECT COUNT(maThoiGian) as count,  thoiGianBatDau, thoiGianKetThuc, maThoiGian, maND from tbldangkylichkham, tblthoigianlamviec WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and thoiGianDky = '${ngayDatLich}' GROUP by maThoiGian`
  );
  return res.status(200).json({
    data: rows,
  });
};
const getPhieuKhamUserService = async (req, res) => {
  const { maND } = req.params;
  const [rows, fields] = await pool.execute(
    `SELECT ngaySinh, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau from tbldangkylichkham, tblnguoidung, tblthoigianlamviec WHERE tbldangkylichkham.maND = tblnguoidung.maND and tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tbldangkylichkham.maND = '${maND}'`
  );
  return res.status(200).json({
    data: rows,
    total: rows.length,
  });
};
const postDatLichService = async (req, res) => {
  const { maND, maThoiGian, tinhTrang, thoiGianDangKy } = req.body;
  console.log(req.body);
  await pool.execute(
    'INSERT INTO tbldangkylichkham(maND, maThoiGian, tinhTrangDangKy, thoiGianDKy) VALUES (?,?,?,?)',
    [maND, maThoiGian, tinhTrang, thoiGianDangKy]
  );
  return res.status(200).json({
    status: 200,
    message: 'Đăng ký lịch khám thành công',
  });
};

const getAllDatLichService = async (req, res) => {
  const { ngayDatLich } = req.query;
  const [rows, fields] = await pool.execute(
    `SELECT ngaySinh, tbldangkylichkham.maND, maThoiGian, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau from tbldangkylichkham, tblthoigianlamviec, tblnguoidung WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tblnguoidung.maND = tbldangkylichkham.maND and thoiGianDky = '${ngayDatLich}'`
  );
  return res.status(200).json({
    data: rows,
    total: rows.length,
  });
};

const editDatLichService = async (req, res) => {
  const { thoiGianDky, maND, maThoiGian } = req.query;
  const { tinhTrangDangKy } = req.body;

  const [rows, fields] = await pool.execute(
    `SELECT  * from tbldangkylichkham WHERE maND ='${maND}' and maThoiGian = ${maThoiGian} and thoiGianDky = '${thoiGianDky}'`
  );

  console.log(tinhTrangDangKy, req.query);
  if (!rows) {
    return res.status(400).json({
      message: 'Không tìm thấy phiếu đặt lịch',
    });
  } else {
    await pool
      .execute(
        `UPDATE tbldangkylichkham set tinhTrangDangKy=? WHERE maND =? and maThoiGian = ? and thoiGianDky = ?`,
        [tinhTrangDangKy, maND, maThoiGian, thoiGianDky]
      )
      .then(() => {
        return res.status(200).json({
          message: 'Cập nhật trạng thái phiếu thành công',
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: error,
        });
      });
  }
};

module.exports = {
  getChoDatLichService,
  postDatLichService,
  getPhieuKhamUserService,
  getAllDatLichService,
  editDatLichService,
};
