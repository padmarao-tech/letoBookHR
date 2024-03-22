var mysql = require('mysql');

var connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oot@123",
  database: "letosyshr",
  port:'3306'
});


module.exports = connectDB;
