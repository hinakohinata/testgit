const express = require("express");
const con = require("../config/db.config");

const app = express();

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `health`";
  con.query(sql, function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});

app.get("/:Id", (req, res) => {
  const id = req.params.Id;
  const sql = "SELECT * FROM `health` WHERE id = ?;";
  con.query(sql, [id], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});
app.get("/name/:student_name", (req, res) => {
  const student_name = `%${req.params.student_name}%`; // Sử dụng dấu % trước và sau tên để tìm kiếm mọi nơi có từ khóa
  const sql = "SELECT health.student_id, health.teacher_id, health.date, health.note, health.height, health.weight, health.vaccination,student.name FROM `health` INNER JOIN  `student` ON health.student_id = student.student_id WHERE student.name LIKE ?;";
  con.query(sql, [student_name], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});

app.post('/', (req, res) => {
  const { id, student_id, date, note, teacher_id, height, weight, vaccination } = req.body;

  if (!student_id) {
      return res.status(500).send("Học sinh trống!");
  }
  
  const sql = "INSERT INTO `health` (`id`, `student_id`, `date`, `note`, `teacher_id`, `height`, `weight`, `vaccination`) VALUES (?,?,?,?,?,?,?,?);";
  
  con.query(sql, [id, student_id, date, note, teacher_id, height, weight, vaccination], (error, result) => {
      if (error) {
          return res.status(500).send(error);
      }
      return res.status(200).json({ ThongBao: 'Thành công' });
  });
});


app.put('/:Id', (req, res) => {
    const id = req.params.Id;  // Sửa ở đây
    const student_id = req.body.student_id;
    const date = req.body.date;
    const note = req.body.note;
    const teacher_id = req.body.teacher_id; 
    const height = req.body.height;     
    const weight = req.body.weight;  
    const vaccination = req.body.vaccination;    
    if (!student_id) {
        res.status(500).send("Học sinh trống!");
    }

    const sql = "UPDATE `health` SET `student_id` = ?, `date` = ?, `note` = ?,`teacher_id`=?,`height`=?,`weight`=?,`vaccination`=? WHERE (`id` = ?);";
    con.query(sql, [ student_id,date,note,teacher_id,height,weight,vaccination,id], function (error, result) {
        if (error) {
            return res.status(500).send(error);
        }
        
        // Trả về dữ liệu đã cập nhật
        const updatedData = {
            id: id,
            student_id: student_id,
            date: date,
            note: note,
            teacher_id:teacher_id,
            height:height,
            weight:weight,
            vaccination:vaccination,
            
        };
        return res.status(200).json(updatedData);
    });
});

app.delete('/:Id', (req, res) => {
  const id = req.params.Id;
  const sql = "DELETE FROM `health` WHERE id = ?;";
  con.query(sql, [id], function (error, result) {
      if (error){
          res.status(500).send(error);
      res.json(result);
  }  return res.status(200).json({ ThongBao: 'Thành công' });
  })
})
module.exports = app;
