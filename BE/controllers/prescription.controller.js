const express = require("express");
const con = require("../config/db.config");

const app = express();

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `prescription`";
  con.query(sql, function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});

app.get("/:Id", (req, res) => {
  const id = req.params.Id;
  const sql = "SELECT * FROM `prescription` WHERE id = ?;";
  con.query(sql, [id], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});
app.get("/name/:student_name", (req, res) => {
  const student_name = `%${req.params.student_name}%`; // Sử dụng dấu % trước và sau tên để tìm kiếm mọi nơi có từ khóa
  const sql = "SELECT prescription.student_id, prescription.date, prescription.content, prescription.medicine_name, student.name FROM `prescription` INNER JOIN  `student` ON prescription.student_id = student.student_id WHERE student.name LIKE ?;";
  con.query(sql, [student_name], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});
app.post('/', (req, res) => {
  const { id, student_id, date, content,medicine_name } = req.body;

  if (!student_id) {
      return res.status(500).send("Học sinh trống!");
  }
  
  const sql = "INSERT INTO `prescription` (`id`, `student_id`, `date`, `content`, `medicine_name`) VALUES (?,?,?,?,?);";
  
  con.query(sql, [id, student_id, date, content, medicine_name ], (error, result) => {
      if (error) {
          return res.status(500).send(error);
      }
      const createData = {
        id: id,
        student_id: student_id,
        date: date,
        content: content,
        medicine_name:medicine_name,            
    };
    return res.status(200).json(createData);
  });
});


app.put('/:Id', (req, res) => {
    const id = req.params.Id;  // Sửa ở đây
    const student_id = req.body.student_id;
    const date = req.body.date;
    const content = req.body.content;
    const medicine_name = req.body.medicine_name; 
   
    if (!student_id) {
        res.status(500).send("Học sinh trống!");
    }

    const sql = "UPDATE `prescription` SET `student_id` = ?, `date` = ?, `content` = ?,`medicine_name`=? WHERE (`id` = ?);";
    con.query(sql, [ student_id,date, content,medicine_name,id], function (error, result) {
        if (error) {
            return res.status(500).send(error);
        }
        
        // Trả về dữ liệu đã cập nhật
        const updatedData = {
            id: id,
            student_id: student_id,
            date: date,
            content: content,
            medicine_name:medicine_name,            
        };
        return res.status(200).json(updatedData);
    });
});

app.delete('/:Id', (req, res) => {
  const id = req.params.Id;
  const sql = "DELETE FROM `prescription` WHERE id = ?;";
  con.query(sql, [id], function (error, result) {
      if (error){
          res.status(500).send(error);
      res.json(result);
  }  return res.status(200).json({ ThongBao: 'Thành công' });
  })
})
module.exports = app;
