const mysql = require('mysql2/promise');
// // create the connection to database

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'dat-lich-kham',
// });
var pool = mysql.createPool({
  host: 'mysql-109407-0.cloudclusters.net', // Replace with your host name
  user: 'admin', // Replace with your database username
  password: '98zHm5J4', // Replace with your database password
  database: 'dat-lich-kham', // // Replace with your database Name
  port: 10021,
});
pool.getConnection((err) => {
  if (err) console.log(JSON.stringify(err));
  else {
    console.log('Connected!');
  }
});

module.exports = pool;
