const express = require('express');
const con = require('../config/db.config');
const app = express();
const bcrypt = require('bcrypt');


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let fetchedPassword;
  if (!username || !password) {
    res.status(400).json({ error: 'Hãy điền đầy đủ thông tin.' });
  } else {
    const sql = "SELECT  u.*, r.role1, r.role2, r.role3, r.role4, r.role5, r.role6, r.role7, r.role8 FROM user u INNER JOIN"
      + " role_user r ON u.user_id = r.user_id WHERE u.user_id = ? or u.email = ?";
    con.query(sql, [username, username], async (error, result) => {
      if (error)
        res.status(500).send(error);
      if (result.length === 0) {
        res.json({ error: 'Không có người dùng.' })
      } else {
        if (result[0].status == 0) {
          res.json({ error: 'Tài khoản đã khóa.' })
        } else {
          const dbPassword = result[0].password;
          const valid = await bcrypt.compare(password, dbPassword)
          if (valid)
            res.json(result[0])
          else
            res.json({ error: 'Mật khẩu không đúng.' })
        }
      }

    });
  }
});


app.post('/getAll', (req, res) => {
  const sql = "SELECT  u.*, r.role1, r.role2, r.role3, r.role4, r.role5, r.role6, r.role7, r.role8 FROM user u INNER JOIN"
    + " role_user r ON u.user_id = r.user_id";
  con.query(sql, function (error, result) {
    if (error)
      res.status(500).send(error);
    res.json(result);
  })
});
app.post('/getByID/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT  u.*, r.role1, r.role2, r.role3, r.role4, r.role5, r.role6, r.role7, r.role8 FROM user u INNER JOIN"
    + " role_user r ON u.user_id = r.user_id WHERE u.user_id = ?";
  con.query(sql, [user_id], function (error, result) {
    if (error)
      res.status(500).send(error);
    res.json(result);
  })
});

app.post('/getAllByRole/:role', (req, res) => {
  const role = `role` + req.params.role;
  const sql = `SELECT  u.*, r.role1, r.role2, r.role3, r.role4, r.role5, r.role6, r.role7, r.role8 FROM user u INNER JOIN role_user r ON u.user_id = r.user_id  WHERE r.${role} = 1`;
  con.query(sql, function (error, result) {
    if (error)
      res.status(500).send(error);
    res.json(result);
  })
});

app.post('/search/:name', (req, res) => {
  let name='';
  if(req.params.name.length>0)
  name =  `WHERE u.name like '%${req.params.name}%'` 
  const sql = `SELECT  u.*, r.role1, r.role2, r.role3, r.role4, r.role5, r.role6, r.role7, r.role8 FROM user u INNER JOIN role_user r ON u.user_id = r.user_id ${name}`;
  con.query(sql, function (error, result) {
    if (error)
      res.status(500).send(error);
    res.json(result);
  })
});

app.post('/updateInfAccById/:userId', (req, res) => {
  const user_id = req.params.userId;
  const address = req.body.address;
  const birthday = req.body.birthday;
  const email = req.body.email;
  const ethnic = req.body.ethnic;
  const gender = req.body.gender;
  const identity_number = req.body.identity_number;
  const name = req.body.name;
  const phone = req.body.phone;
  const sql = `
    UPDATE user SET 
        name = ?, 
        birthday = ?, 
        address = ?, 
        phone = ?, 
        ethnic = ?, 
        identity_number = ?, 
        email = ?, 
        gender = ?
    WHERE user_id = ?;
`;

  con.query(sql, [name, birthday, address, phone, ethnic, identity_number, email, gender, user_id], function (error, results) {
    if (error)
      res.status(500).send(error);
    res.json("oke");
  });

});

app.put('/disableAccById/:userId', (req, res) => {
  const user_id = req.params.userId;
  const sql = `
    UPDATE user SET 
        status='0'
    WHERE user_id = ?;
`;

  con.query(sql, [user_id], function (error, results) {
    if (error)
      res.status(500).send(error);
    const sql = "SELECT  u.*, r.role1, r.role2, r.role3, r.role4, r.role5, r.role6, r.role7, r.role8 FROM user u INNER JOIN"
      + " role_user r ON u.user_id = r.user_id";
    con.query(sql, function (error, result) {
      if (error)
        res.status(500).send(error);
      res.json(result);
    })
  });

});

app.post('/', (req, res) => {
  // const id = req.body.id;
  const user_id = req.body.identity_number;
  const address = req.body.address;
  const birthday = req.body.birthday;
  const email = req.body.email;
  const ethnic = req.body.ethnic;
  const gender = req.body.gender;
  const identity_number = req.body.identity_number;
  const name = req.body.name;
  const phone = req.body.phone;
  const isParent = req.body.isParent;
  const position_id = req.body.position_id;
  const password = "$2a$10$pIDMA.7W/wi8b3EfURWjIe5OnkRpUpEnvMtHLSFmXtCjfR8u4qkD.";
  const role = "role" + position_id;
  if (!name) {
    res.status(500).send("Tên task trống!");
  }
  else {
    const sql = " INSERT INTO `user`(`user_id`,`name`,`birthday`,`address`,`phone`,`ethnic`,`identity_number`,`email`,`password`,`position_id`,`gender`,`status`)"
      + "VALUES (?,?,?,?,?,?,?,?,?,?,?,1);";
    con.query(sql, [user_id, name, birthday, address, phone, ethnic, identity_number, email, password, position_id, gender], function (error, result) {
      if (error) {
        res.status(500).send(error); 
        console.log(error);
      } else {
        const sql1 = ` INSERT INTO role_user(user_id,${role}) VALUES (?,'1');`;
        con.query(sql1, [user_id], function (error, result) {
          if (error) {
            res.status(500).send(error);
            console.log(error);
          } else {
            if (isParent) {
              const sql2 = `UPDATE role_user SET role8='1' WHERE user_id= ?`;
              con.query(sql2, [user_id], function (error, result) {
                if (error) {
                  res.status(500).send(error); 
                  console.log(error);
                };
              })
            }

          }
        })
      }
    })


  }
})



app.post('/changePassword', async (req, res) => {
  // const id = req.body.id;
  const user_id = req.body.userId;
  const password = req.body.password;
  let hasdPassword;
  const sql = "UPDATE `user` SET `password`=? WHERE `user_id`=?;";
  // if (password === Epassword)
  hasdPassword = await bcrypt.hash(password, 10)
  console.log(password, hasdPassword)
  con.query(sql, [hasdPassword, user_id], (error, result) => {
    if (error)
      res.status(500).send(error);
    else {
      res.json(result);
    }
  })
})








module.exports = app;

