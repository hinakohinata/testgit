const express = require('express');
const connection = require('../config/db.config');
const app = express();


app.get('/getforAddAsm1to6', (req, res) => {
  const sql = "SELECT u.user_id,u.name, p.name as pname FROM user u "+
  "LEFT JOIN assignment a ON u.user_id = a.user_id "+
  "inner join positions p on p.id=u.position_id "+
  "WHERE u.status = 1  AND a.user_id IS NULL "+
  "AND u.position_id BETWEEN 1 AND 6;";
  connection.query(sql, (error, result) => {
      if (error)
          res.status(500).send(error);
      else {
          res.json(result);
      }
  })
})
app.get('/getforAddAsm7', (req, res) => {
  const sql = "SELECT u.user_id,u.name, p.name as pname FROM user u "+
  "LEFT JOIN assignment a ON u.user_id = a.user_id "+
  "inner join positions p on p.id=u.position_id "+
  "WHERE u.status = 1  AND a.user_id IS NULL "+
  "AND u.position_id = 7;";
  connection.query(sql, (error, result) => {
      if (error)
          res.status(500).send(error);
      else {
          res.json(result);
      }
  })
})
app.get('/getforAddAsmStudent', (req, res) => {
    const sql = "SELECT u.student_id,u.name FROM student u "+
    " LEFT JOIN assignment_student a ON u.student_id = a.student_id "+
    "WHERE u.status = 1 AND a.student_id IS NULL;";
    connection.query(sql, (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            res.json(result);
        }
    })
  })


  app.post('/getStudentForAddFeeCollection', (req, res) => {
    const {fee_type_id,amount,note}=req.body;
    const sql = "SELECT s.student_id,s.name,s.identity_number,r.class_group_id "+
    "FROM student s "+
    "join assignment_student asms on asms.student_id=s.student_id and asms.status=1 "+
    "inner join room r on r.room_id=asms.room_id "+
    "LEFT JOIN fee_collection fc ON s.student_id = fc.student_id AND fc.academic = YEAR(CURDATE()) "+
    "and fc.fee_type_id= ? "+
    "WHERE fc.id IS NULL;";
    connection.query(sql,[fee_type_id], (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            const tmp = result.map(item => {
                return {
                    ...item,
                    fee_type_id: fee_type_id,
                    amount: amount,
                    note: note
                };
            });
            res.json(tmp);
        }
    })
  })





module.exports = app;

