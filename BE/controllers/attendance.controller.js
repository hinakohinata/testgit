const express = require('express');
const connection = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    connection.query('SELECT * FROM attendance', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(results);
    })
})

app.post('/getByDate', (req, res) => {
    const date = "%" + req.body.date + "%";
    const sql = 'SELECT a.*,s.name sname,r.name rname FROM attendance a  ' +
        'INNER JOIN student s               ON a.student_id = s.student_id ' +
        'INNER JOIN assignment_student asm   ON s.student_id = asm.student_id ' +
        'INNER JOIN room r                  ON r.room_id = asm.room_id ' +
        'where a.attendance_date like ?';
    connection.query(sql, [date], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})


app.post('/createByDate', (req, res) => {
    const dataArray = req.body;
    console.log(dataArray)
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
    const values = dataArray.map(dataItem => [today, dataItem.teacher_id, dataItem.student_id, 1]);
    const sql = 'INSERT INTO `attendance`(`attendance_date`,`teacher_id`,`student_id`,`status`) VALUES ?';

    connection.query(sql, [values], function (error, result) {
        if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ success: false, message: "Failed to insert data" });
        }
        res.json({ success: true, message: "Data processed" });
    });
});

module.exports = app