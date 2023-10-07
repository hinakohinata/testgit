const express = require('express');
const connection = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    connection.query('SELECT * FROM assignment order by status desc', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getAll');
        } else {
            res.json(results);
        }
    })
})
app.get('/getByAsmTable', (req, res) => {
    const sql = "SELECT DISTINCT a.*, u.name as uname, r.name as rname FROM student u "+
    "INNER JOIN assignment_student a ON u.student_id = a.student_id "+
    "INNER JOIN room r ON r.room_id = a.room_id "+
    "ORDER BY a.status DESC;";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})
app.post('/getByRoom', (req, res) => {
    const room_id = req.body.room_id;
    const sql = 'SELECT * FROM assignment where room_id = ? order by status desc';
    connection.query(sql, [room_id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/', (req, res) => {
    const room_id = req.body.room_id;
    const student_id = req.body.student_id;
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
    const sql = 'INSERT INTO `assignment_student`(`room_id`,`student_id`,`created_time`,`status`)' +
        'VALUES (?,?,?,1)';
    connection.query(sql, [room_id, student_id, today], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/setOff', (req, res) => {
    const id = req.body.id;
    console.log(id);
    const sql = `UPDATE assignment_student set status =0 where id= '${id}' ; `
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.post('/changeRoom', (req, res) => {
    const { id, room_id, student_id } = req.body;
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
    const sql = `UPDATE assignment_student set status =0 where id= '${id}' ; `
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            const sql1 = `INSERT INTO assignment_student(room_id,student_id,created_time,status) ` +
                `VALUES ('${room_id}','${student_id}','${today}',1);`;
            connection.query(sql1, function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                } else {
                    res.json(result);
                }
            })
        }
    })
})
module.exports = app


