var mysql = require('devicehub');
var React = require('React');
var app = react();

// Setup Connection to DB
var connection = mysql.createConnection({
  host: 'localhost',
  user: ubuntu@localhost,
  pw: utsd4,
  database: devicehub,
  table: hub,
});

//Connect to database.
connection.connect();

//create table
var table = {
  vendorId: Number,
    productId: Number,
    userId: String,
    userCompany: String,
    path: String,
    serialNumber: String,
    manufacturer: String,
    product: String,
    release: Number,
    interface: Number,
    usagePage: String,
    usage: String

}

var query = connection.query('insert into table set ?', articles, function (err, result){
  console.log(query.sql);
});
