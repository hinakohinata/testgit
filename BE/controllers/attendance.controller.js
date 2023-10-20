const express = require('express');
const con = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    con.query('SELECT * FROM attendance', (error, results) => {
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
    con.query(sql, [date], function (error, result) {
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

    con.query(sql, [values], function (error, result) {
        if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ success: false, message: "Failed to insert data" });
        }
        res.json({ success: true, message: "Data processed" });
    });
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM `attendance`";
    con.query(sql, function (error, result) {
        if (error) res.status(500).send(error);
        res.json(result);
    });
});

app.get("/:Id", (req, res) => {
    const id = req.params.Id;
    const sql = "SELECT * FROM `attendance` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error) res.status(500).send(error);
        res.json(result);
    });
});
app.get("/date/:date", (req, res) => {
    const date = req.params.date;
    const sql = "SELECT * FROM `attendance` WHERE attendance_date = ?;";
    con.query(sql, [date], function (error, result) {
        if (error) res.status(500).send(error);
        res.json(result);
    });
});
app.put('/:Id', (req, res) => {
    const id = req.params.Id;  // Sửa ở đây
    const attendance_date = req.body.attendance_date;
    const teacher_id = req.body.teacher_id;
    const student_id = req.body.student_id;
    const class_id = req.body.class_id;
    const status = req.body.status;
    const reason = req.body.reason;


    const sql = "UPDATE `attendance` SET `attendance_date` = ?, `teacher_id`=?,`student_id`=?,`class_id`=?,`status`=?,`reason`=? WHERE (`id` = ?);";
    con.query(sql, [attendance_date, teacher_id, student_id, class_id, status, reason, id], function (error, result) {
        if (error) {
            return res.status(500).send(error);
        }

        // Trả về dữ liệu đã cập nhật
        const updatedData = {
            id: id,
            attendance_date: attendance_date,
            teacher_id: teacher_id,
            status: status,
            reason: reason,

        };
        return res.status(200).json(updatedData);
    });
});

module.exports = app