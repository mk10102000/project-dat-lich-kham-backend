const pool = require('../configs/connectDB');

const getThoiGianLamViec = async (res) => {
  try {
    const [rows, fields] = await pool.execute(
      `Select *from tblthoigianlamviec`
    );
    return res.status(200).json({
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Lỗi hệ thống',
    });
  }
};

const getLichLamViecBacSi = async (req, res) => {
  const { maND } = req.params;

  try {
    const [rows, fields] = await pool.execute(
      `Select *from tbllichlamviec, tblthoigianlamviec  where maND = '${maND}' and tbllichlamviec.maTG = tblthoigianlamviec.maTG`
    );
    return res.status(200).json({
      data: rows,
    });
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

const loginService = async (body, res) => {};

module.exports = { getThoiGianLamViec, loginService, getLichLamViecBacSi };
