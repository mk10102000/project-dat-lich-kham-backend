const pool = require('../configs/connectDB');

const getKhoaService = async (res) => {
  try {
    const [rows, fields] = await pool.execute(`Select *from tblkhoa`);
    return res.status(200).json({
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Lỗi hệ thống',
    });
  }
};
module.exports = { getKhoaService };
