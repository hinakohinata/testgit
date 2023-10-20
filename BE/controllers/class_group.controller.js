const express = require("express");
const con = require("../config/db.config");

const app = express();

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `class_group`";
  con.query(sql, function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});


module.exports = app;
