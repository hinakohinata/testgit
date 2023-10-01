const express = require('express');
const connection = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    connection.query('SELECT * FROM attendance', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getAll');
        } else {
            res.json(results);
        }
    })
})

app.post('/getByDate', (req, res) => {
    const date = "%"+req.body.date+"%";
    const sql = 'SELECT a.*,s.name sname,r.name rname FROM attendance a  '+
    'INNER JOIN student s               ON a.student_id = s.student_id '+
    'INNER JOIN assignment_student asm   ON s.student_id = asm.student_id '+
    'INNER JOIN room r                  ON r.room_id = asm.room_id '+
    'where a.attendance_date like ?';
    connection.query(sql, [date], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})
module.exports = app