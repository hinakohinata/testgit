const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'bckjd2tbaw1o50x7macp-mysql.services.clever-cloud.com',
  user: 'uzwzzg9hkdjb9jvy',
  password: '7o9B3C7i6iqbUUbE7Pa9',
  database: 'bckjd2tbaw1o50x7macp'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to database!');
});