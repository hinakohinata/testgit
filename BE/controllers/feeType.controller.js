const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/', (req, res) => {
    const sql = "SELECT * FROM `fee_type`";
    con.query(sql, function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})
app.get('/search/:text', (req, res) => {
    const text =req.params.text;
    const sql = "SELECT * FROM `fee_type` WHERE (`name` like ?) ";
    con.query(sql,  ['%' + text + '%'],function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})

app.post('/', (req, res) => {
    // const id = req.body.id;
    const name = req.body.name;
    const num_leave_days = req.body.num_leave_days;
    const salary = req.body.salary;

    if (!name) { 
        res.status(500).send("Tên chức vụ trống!");
    }
    else {
        const sql = "INSERT INTO `fee_type` (`name`,`num_leave_days`,`salary`) VALUES (?,?,?);";
        con.query(sql, [name, num_leave_days, salary], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})


app.put('/:id', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const num_leave_days = req.body.num_leave_days;
    const salary = req.body.salary;

    if (!name) {
        res.status(500).send("Tên chức vụ trống!");
    }
    else {
        const sql = "UPDATE `fee_type` SET `name` = ?, `num_leave_days` = ?, `salary` = ? WHERE (`id` = ?);";
        con.query(sql, [name, num_leave_days, salary, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `fee_type` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `fee_type` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})



module.exports = app