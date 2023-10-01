const express = require('express');
const connection = require('../config/db.config');
const app = express();
app.get('/', (req, res) => {
    connection.query('SELECT * FROM assignment', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getAll');
        } else {
            res.json(results);
        }
    })
})
app.get('/getByAsmTable', (req, res) => {
    const sql = "SELECT  a.*,u.name as uname, u.position_id as pid, p.name as pname, r.name as rname FROM user u INNER JOIN assignment a ON u.user_id = a.user_id"
   +" INNER JOIN room r ON r.room_id = a.room_id  INNER JOIN positions p ON p.id = u.position_id ";
    connection.query(sql, (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            res.json(result);
        }
    })
})
app.post('/getByRoom', (req, res) => {
    const room_id = req.body.room_id;
    const sql = 'SELECT * FROM assignment where room_id = ?';
    connection.query(sql, [room_id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})
module.exports = app