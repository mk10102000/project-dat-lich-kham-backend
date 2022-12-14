const express = require('express');
const bodyParser = require('body-parser');
const userApi = require('./user.route');
const thoiGianApi = require('./thoiGianLamViec.route');
const datLichApi = require('./datLich.route');

let router = express.Router();

function innitAPIRoute(app) {
  // CORS

  userApi(router);
  thoiGianApi(router);
  datLichApi(router)
  return app.use('/api/', router);
}

module.exports = { innitAPIRoute };
