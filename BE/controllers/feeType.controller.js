const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/', (req, res) => {
    const sql = "SELECT * FROM `fee_type`";
    con.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})
app.get('/search/:text', (req, res) => {
    const text = req.params.text;
    const sql = `SELECT * FROM fee_type WHERE name LIKE ?
    `;
    con.query(sql, ['%' + text + '%'], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log("API Search Results:", result);
            res.json(result);
        }
    })
});



app.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM fee_type where status = 0;";
    con.query(sql,  function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.get('/getTypeForAddFeeCollection', (req, res) => {
    const sql = "SELECT * FROM fee_type where status = 0;";
    con.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})



module.exports = app