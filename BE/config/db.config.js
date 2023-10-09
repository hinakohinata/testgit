//connect database
require('dotenv').config();

// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'new2',
//     port: 3306
// })
// connection.connect(function (arr) {
//     if (arr) throw arr;
//     console.log('connected db',process.env.POST);
// })
// module.exports = connection



// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// pool.getConnection((err, conn) => {
//     if (err) console.log(err)
//     console.log("Connected successfully")
// })

// module.exports = pool.promise()


const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DBNAME || 'new2',
    port: parseInt(process.env.DB_PORT) || 3306
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected to db on port', process.env.DB_PORT,' and db name ',process.env.DB_DBNAME);
});

module.exports = connection;
