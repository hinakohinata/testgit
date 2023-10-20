const express = require("express");
const con = require("../config/db.config");

const app = express();

app.get("/parent", (req, res) => {
  const sql = `
    SELECT u.user_id, u.name
    FROM user u
    INNER JOIN role_user ru ON u.user_id = ru.user_id
    WHERE ru.role8 = 1`;

  con.query(sql, (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(result);
  });
});

app.get("/teacher", (req, res) => {
  const sql = `
    SELECT u.user_id, u.name
    FROM user u
    INNER JOIN role_user ru ON u.user_id = ru.user_id
    WHERE ru.role7 = 1`;

  con.query(sql, (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(result);
  });
});
app.get("/student_health", (req, res) => {
  const sql = `
    SELECT student.student_id , student.name
    FROM student;`
  con.query(sql, (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(result);
  });
});
app.get("/user_all", (req, res) => {
  const sql = `
    SELECT user.user_id , user.name
    FROM user;`
  con.query(sql, (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(result);
  });
});
app.get("/role", (req, res) => {
  const sql = `
  SELECT u.user_id, u.name
  FROM user u
  INNER JOIN role_user ru ON u.user_id = ru.user_id
  WHERE ru.role1 = 1 OR ru.role2 = 1 OR ru.role3 = 1 OR ru.role4 = 1 OR ru.role5 = 1 OR ru.role6 = 1`;
  

  con.query(sql, (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(result);
  });
});
module.exports = app;
