const express = require('express');
const bodyParser = require('body-parser');
const userApi = require('./user.route');
const thoiGianApi = require('./thoiGianLamViec.route');
const datLichApi = require('./datLich.route');
const baiDangApi = require('./baiDang.route');

let router = express.Router();

function innitAPIRoute(app) {
  // CORS

  userApi(router);
  thoiGianApi(router);
  datLichApi(router);
  baiDangApi(router);
  return app.use('/api/', router);
}

module.exports = { innitAPIRoute };
