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
  const { tinhTrangDky } = req.query;
  try {
    if (tinhTrangDky) {
      const [rows, fields] = await pool.execute(
        `SELECT ngaySinh, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau 
        from tbldangkylichkham, tblnguoidung, tblthoigianlamviec 
        WHERE tbldangkylichkham.maND = tblnguoidung.maND and tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tbldangkylichkham.maND = '${maND}' and tinhTrangDangKy = 'hoanThanh' ORDER by thoiGianDKy`
      );
      return res.status(200).json({
        data: rows,
        total: rows.length,
      });
    } else {
      const [rows, fields] = await pool.execute(
        `SELECT ngaySinh, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau
        from tbldangkylichkham, tblnguoidung, tblthoigianlamviec WHERE
        tbldangkylichkham.maND = tblnguoidung.maND and tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tbldangkylichkham.maND = '${maND}' and (tinhTrangDangKy = 'Pending' or tinhTrangDangKy = 'Success') ORDER by thoiGianDKy`
      );
      return res.status(200).json({
        data: rows,
        total: rows.length,
      });
    }
  } catch (error) {}
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
  const { ngayBatDau, ngayKetThuc, maThoiGian, tinhTrangDangKy } = req.query;
  if (maThoiGian || tinhTrangDangKy) {
    try {
      if (tinhTrangDangKy) {
        const [rows, fields] = await pool.execute(
          `SELECT ngaySinh, tbldangkylichkham.maND, maThoiGian, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau
          from tbldangkylichkham, tblthoigianlamviec, tblnguoidung
          WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tblnguoidung.maND = tbldangkylichkham.maND and tinhTrangDangKy = '${tinhTrangDangKy}' and thoiGianDky BETWEEN '${ngayBatDau}' AND '${ngayKetThuc}' ORDER by thoiGianDKy`
        );
        return res.status(200).json({
          data: rows,
          total: rows.length,
        });
      } else if (maThoiGian) {
        const [rows, fields] = await pool.execute(
          `SELECT ngaySinh, tbldangkylichkham.maND, maThoiGian, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau
          from tbldangkylichkham, tblthoigianlamviec, tblnguoidung
          WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tblnguoidung.maND = tbldangkylichkham.maND and tbldangkylichkham.maThoiGian = '${maThoiGian}' and thoiGianDky BETWEEN '${ngayBatDau}' AND '${ngayKetThuc}' ORDER by thoiGianDKy`
        );
        return res.status(200).json({
          data: rows,
          total: rows.length,
        });
      } else {
        const [rows, fields] = await pool.execute(
          `SELECT ngaySinh, tbldangkylichkham.maND, maThoiGian, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau
          from tbldangkylichkham, tblthoigianlamviec, tblnguoidung
          WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tblnguoidung.maND = tbldangkylichkham.maND and tbldangkylichkham.maThoiGian = '${maThoiGian}'and tinhTrangDangKy = '${tinhTrangDangKy}' and thoiGianDky BETWEEN '${ngayBatDau}' AND '${ngayKetThuc}' ORDER by thoiGianDKy`
        );
        return res.status(200).json({
          data: rows,
          total: rows.length,
        });
      }
    } catch (error) {}
  } else {
    try {
      const [rows, fields] = await pool.execute(
        `SELECT ngaySinh, tbldangkylichkham.maND, maThoiGian, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau
        from tbldangkylichkham, tblthoigianlamviec, tblnguoidung
        WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tblnguoidung.maND = tbldangkylichkham.maND and thoiGianDky BETWEEN '${ngayBatDau}' AND '${ngayKetThuc}' ORDER by thoiGianDKy`
      );
      return res.status(200).json({
        data: rows,
        total: rows.length,
      });
    } catch (error) {}
  }
};

const editDatLichService = async (req, res) => {
  const { thoiGianDky, maND, maThoiGian } = req.query;
  const { tinhTrangDangKy } = req.body;

  const [rows, fields] = await pool.execute(
    `SELECT  * from tbldangkylichkham WHERE maND ='${maND}' and maThoiGian = ${maThoiGian} and thoiGianDky = '${thoiGianDky}'`
  );

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

const getDatLichByMaThoiGian = async (req, res) => {
  const { maThoiGian, thoiGianDky } = req.query;
  try {
    if (maThoiGian && thoiGianDky) {
      const [rows, fields] = await pool.execute(
        `SELECT ngaySinh, tbldangkylichkham.maND, maThoiGian, gioiTinh,tinhTrangDangKy, hoTen, SDT, thoiGianDky, thoiGianBatDau
        from tbldangkylichkham, tblthoigianlamviec, tblnguoidung
        WHERE tblthoigianlamviec.maTG = tbldangkylichkham.maThoiGian and tblnguoidung.maND = tbldangkylichkham.maND and tbldangkylichkham.maThoiGian = '${maThoiGian}' and thoiGianDky='${thoiGianDky}' and (tinhTrangDangKy='hoanThanh' or tinhTrangDangKy = 'Success') ORDER by thoiGianDKy`
      );
      return res.status(200).json({
        data: rows,
        total: rows.length,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Ma thoi gian hoac thoi gian bi sai',
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: 'Lỗi khi get đặt lịch',
    });
  }
};

module.exports = {
  getChoDatLichService,
  postDatLichService,
  getPhieuKhamUserService,
  getAllDatLichService,
  editDatLichService,
  getDatLichByMaThoiGian,
};
