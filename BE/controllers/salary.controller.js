const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/', (req, res) => {
    const sql = "SELECT * FROM `salary`";
    con.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})
app.post('/getByMonthAndYear', (req, res) => {
    const month = req.body.month;
    const year = req.body.year;
    const sql = "SELECT * FROM salary where month(received_date)=? and year(received_date)=?;";
    con.query(sql,[month,year], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})
app.get('/search/:text', (req, res) => {
    const text =req.params.text;
    const sql = "SELECT * FROM `salary` WHERE (`name` like ?) ";
    con.query(sql,  ['%' + text + '%'],function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
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
        const sql = "INSERT INTO `salary` (`name`,`num_leave_days`,`salary`) VALUES (?,?,?);";
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
        const sql = "UPDATE `salary` SET `name` = ?, `num_leave_days` = ?, `salary` = ? WHERE (`id` = ?);";
        con.query(sql, [name, num_leave_days, salary, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `salary` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `salary` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})



module.exports = app