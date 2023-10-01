//connect database
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'new2',
    port: 3306
})
connection.connect(function (arr) {
    if (arr) throw arr;
    console.log('connected db');
})
module.exports = connection