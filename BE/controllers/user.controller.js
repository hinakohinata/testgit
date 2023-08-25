const express = require('express');
const con = require('../config/db.config');
const app = express();

app.post('/register', (req, res) => {
  const { username, email, hashedPassword } = req.body;

  if (!username || !email || !hashedPassword) {
    res.status(400).json({ error: 'Hãy điền đầy đủ thông tin.' });
  } else {
    const sql = "INSERT INTO `user` (`username`, `email`, `password`) VALUES (?, ?, ?);";

    con.query(sql, [username, email, hashedPassword], (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng.' });
      } else {
        res.status(201).json({ message: 'Người dùng đã được thêm thành công.' });
      }
    });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let fetchedPassword;
  if (!username || !password) {
    res.status(400).json({ error: 'Hãy điền đầy đủ thông tin.' });
  } else {
    const sql = "SELECT * FROM `user` WHERE `username` = ?";

    con.query(sql, [username], (error, result) => {
      const password = result[0].password;
      fetchedPassword = result[0].password;
      if (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập.' });
      } else {
        if (result.length === 0) {
          res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng.' });
        } else {
          res.status(200).json({ message: 'Đăng nhập thành công.', password: res.json({ password: result.password }) });
        }
      }
    });
  }
});

module.exports = app;

