const express = require('express');
const con = require('../config/db.config');
const app = express();
const bcrypt = require('bcrypt');




app.get('/getAll', (req, res) => {
  const sql = "SELECT  s.*,u.* FROM student s INNER JOIN user u ON u.user_id = s.user_id";
  con.query(sql, function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).send('Error getAll');
  } else {
      res.json(result);
  }
  })
});
app.get('/getListStudent', (req, res) => {
  const sql = "SELECT  s.* FROM student s ";
  con.query(sql, function (error, result) {
    if (error) {
            console.log(error);
            res.status(500).send('Error getAll');
        } else {
            res.json(result);
        }
  })
});

// Get all students
app.get("/", (req, res) => {
  const sql = "SELECT * FROM `student`";
  con.query(sql, function (error, result) {
      if (error) res.status(500).send(error);
      res.json(result);
  });
});

// Get a specific student by ID
app.get("/:Id", (req, res) => {
  const id = req.params.Id;
  const sql = "SELECT * FROM `student` WHERE student_id = ?;";
  con.query(sql, [id], function (error, result) {
      if (error) res.status(500).send(error);
      res.json(result);
  });
});

// Get students by name
app.get("/name/:name", (req, res) => {
  const name = `%${req.params.name}%`;
  const sql = "SELECT * FROM `student` WHERE name LIKE ?;";
  con.query(sql, [name], function (error, result) {
      if (error) res.status(500).send(error);
      res.json(result);
  });
});

// Add a new student
app.post('/', (req, res) => {
  const {
      student_id, name, birthday, gender, address, ethnic, identity_number,
      parent2_name, parent2_birth_year, parent2_hometown, student_hometown,
      created_date, graduated_date, user_id,status
  } = req.body;

  if (!name) {
      return res.status(400).send("Tên trống!");
  }

  const sql = "INSERT INTO `student` (`student_id`, `name`, `birthday`, `gender`, `address`, `ethnic`, `identity_number`, `parent2_name`, `parent2_birth_year`, `parent2_hometown`, `student_hometown`, `created_date`, `graduated_date`, `user_id`,`status`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  con.query(sql, [student_id, name, birthday, gender, address, ethnic, identity_number, parent2_name, parent2_birth_year, parent2_hometown, student_hometown, created_date, graduated_date, user_id,status], function (error, result) {
      if (error) {
          return res.status(500).send(error);
      }
      return res.status(200).json({ ThongBao: 'Thành công' });
  });
});

// Update a student
app.put('/:Id', (req, res) => {
  const student_id = req.params.Id;
  const {
      name, birthday, gender, address, ethnic, identity_number,
      parent2_name, parent2_birth_year, parent2_hometown, student_hometown,
      created_date, graduated_date, user_id, status
  } = req.body;

  if (!name) {
      return res.status(400).send("Tên trống!");
  }

  const sql = "UPDATE `student` SET `name` = ?, `birthday` = ?, `gender` = ?, `address` = ?, `ethnic` = ?, `identity_number` = ?, `parent2_name` = ?, `parent2_birth_year` = ?, `parent2_hometown` = ?, `student_hometown` = ?, `created_date` = ?, `graduated_date` = ?, `user_id` = ?, `status` = ? WHERE (`student_id` = ?);";
  con.query(sql, [name, birthday, gender, address, ethnic, identity_number, parent2_name, parent2_birth_year, parent2_hometown, student_hometown, created_date, graduated_date, user_id,status, student_id], function (error, result) {
      if (error) {
          return res.status(500).send(error);
      }
      
      return res.status(200).json({ ThongBao: 'Cập nhật thành công' });
  });
});

// Delete a student
app.delete('/:Id', (req, res) => {
  const student_id = req.params.Id;
  const sql = "DELETE FROM `student` WHERE student_id = ?;";
  con.query(sql, [student_id], function (error, result) {
      if (error) {
          return res.status(500).send(error);
      }
      return res.status(200).json({ ThongBao: 'Xóa thành công' });
  });
});











module.exports = app;

