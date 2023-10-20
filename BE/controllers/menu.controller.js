const express = require("express");
const con = require("../config/db.config");

const app = express();

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `menu`";
  con.query(sql, function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});

app.get("/:Id", (req, res) => {
  const id = req.params.Id;

  const sql = "SELECT * FROM `menu` WHERE id = ?;";
  con.query(sql, [id], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});
app.get("/date/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT * FROM `menu` WHERE date = ?;";
    con.query(sql, [date], function (error, result) {
      if (error) res.status(500).send(error);
      res.json(result);
    });
  });



module.exports = app;
