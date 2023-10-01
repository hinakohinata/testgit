const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/', (req, res) => {
    const sql = "SELECT * FROM `positions`";
    con.query(sql, function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})
app.get('/search/:text', (req, res) => {
    const text =req.params.text;
    const sql = "SELECT * FROM `positions` WHERE (`name` like ?) ";
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
        const sql = "INSERT INTO `positions` (`name`,`num_leave_days`,`salary`) VALUES (?,?,?);";
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
        const sql = "UPDATE `positions` SET `name` = ?, `num_leave_days` = ?, `salary` = ? WHERE (`id` = ?);";
        con.query(sql, [name, num_leave_days, salary, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `positions` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `positions` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})



module.exports = app