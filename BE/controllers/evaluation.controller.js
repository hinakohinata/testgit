const express = require('express');
const connection = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    
    const sql = 'SELECT a.*,s.name sname,r.name rname,u.name uname FROM evaluation a  '+
    'INNER JOIN student s               ON a.student_id = s.student_id '+
    'INNER JOIN assignment_student asm   ON s.student_id = asm.student_id '+
    'INNER JOIN room r                  ON r.room_id = asm.room_id '+
    'INNER JOIN user u                  ON u.user_id = a.teacher_id ';
    connection.query(sql, (err, results) => {
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
    const sql = 'SELECT a.*,s.name sname,r.name rname FROM evaluation a  '+
    'INNER JOIN student s               ON a.student_id = s.student_id '+
    'INNER JOIN assignment_student asm   ON s.student_id = asm.student_id '+
    'INNER JOIN room r                  ON r.room_id = asm.room_id '+
    'INNER JOIN user u                  ON u.user_id = a.teacher_id '+
    'where a.evaluation_date like ?';
    connection.query(sql, [date], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})
module.exports = app