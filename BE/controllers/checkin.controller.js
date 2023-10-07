const express = require('express');
const connection = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    connection.query('SELECT * FROM checkin', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getAll');
        } else {
            res.json(results);
        }
    })
})
app.get('/getIn4Forcheckin', (req, res) => {
    connection.query('SELECT assignment.* FROM assignment ' +
        'inner join user on user.user_id=assignment.user_id ' +
        'where user.status=1 and assignment.status = 1', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getAll');
            } else {
                res.json(results);
            }
        })
})
app.post('/getByDate', (req, res) => {
    const date = req.body.date;
    const sql = 'SELECT * FROM checkin where date like ?';
    connection.query(sql, ["%" + date + "%"], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/setOff', (req, res) => {
    const { id, reason } = req.body;
    console.log(id)
    console.log(reason.length == 0, reason)
    if (reason.length == 0) {
        const sql = 'UPDATE checkin set status =0 where id= ?';
        connection.query(sql, [id], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else
                res.json(result);
        })
    } else {
        const sql = 'UPDATE checkin set status =2,reason=? where id= ?';
        connection.query(sql, [reason, id], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else
                res.json(result);
        })
    }
})

app.post('/setOn/:id', (req, res) => {
    const id = req.params.id;
    console.log("id",id)
    const sql = 'UPDATE checkin set status = 1, reason=null where id= ?';
    connection.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/createByDate', (req, res) => {
    const dataArray = req.body.data;
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

    // Chuẩn bị dữ liệu cho batch insert
    const values = dataArray.map(dataItem => [today, dataItem.user_id, 1]);
    const sql =
        'INSERT INTO `checkin`(`date`,`user_id`,`status`) VALUES ?';

    connection.query(sql, [values], function (error, result) {
        if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ success: false, message: "Failed to insert data" });
        }
        res.json({ success: true, message: "Data processed" });
    });
});

module.exports = app