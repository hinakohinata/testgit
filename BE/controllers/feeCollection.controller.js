const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/', (req, res) => {
    const sql = "SELECT fc.*,s.name sname,ft.name ftname  FROM `fee_collection` fc " +
        'INNER JOIN fee_type ft               ON ft.id = fc.fee_type_id ' +
        'INNER JOIN student s               ON fc.student_id = s.student_id ';
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
    const sql = "SELECT * FROM `fee_collection` WHERE (`name` like ?) ";
    con.query(sql, ['%' + text + '%'], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/createByDate', (req, res) => {
    const dataArray = req.body.data;
    let data = req.body.data;
    if (dataArray.length == 0) {
        return null;
    } else {
        const now = new Date();
        const year = now.getFullYear();
        if (Number(dataArray[0].note) > 0) {
            data = dataArray.filter(item => Number(item.class_group_id) == Number(item.note));
        }
        const values = data.map(dataItem => [dataItem.student_id, dataItem.fee_type_id, dataItem.amount, year]);
        if (values.length != 0) {
        const sql = 'INSERT INTO `fee_collection`(`student_id`,`fee_type_id`,`amount`,`academic`) VALUES ?';
        con.query(sql, [values], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else
                res.json(result);
        })}
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
        const sql = "UPDATE `fee_collection` SET `name` = ?, `num_leave_days` = ?, `salary` = ? WHERE (`id` = ?);";
        con.query(sql, [name, num_leave_days, salary, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `fee_collection` WHERE id = ?;";
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

    const sql = "SELECT * FROM `fee_collection` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/setOn/:id', (req, res) => {
    const id = req.params.id;
    console.log("id setOn",id)
    const sql = 'UPDATE fee_collection set date = null where id= ?';
    con.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/setOff/:id', (req, res) => {
    const id = req.params.id;    
    const now = new Date();
    const year = now.getFullYear();
    let month = '';
    if (now.getMonth() + 1 >= 10) {
        month = `${now.getMonth() + 1}`;
    } else {
        month = `0${now.getMonth() + 1}`;
    }
    let date = '';
    if (now.getDate() >= 10) {
        date = `${now.getDate() + 1}`;
    } else {
        date = `0${now.getDate()}`;
    }
    const today = `${year}-${month}-${date}`;
    console.log("id setOff",id,today)
    const sql = 'UPDATE fee_collection set date=? where id= ?';
    con.query(sql, [today,id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `fee_collection` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

module.exports = app