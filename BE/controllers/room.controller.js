const express = require("express");
const con = require("../config/db.config");

const app = express();

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `room`";
  con.query(sql, function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});

app.get("/:Id", (req, res) => {
  const id = req.params.Id;

  const sql = "SELECT * FROM `room` WHERE room_id = ?;";
  con.query(sql, [id], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});
app.get("/name/:name", (req, res) => {
  const name = `%${req.params.name}%`; // Sử dụng dấu % trước và sau tên để tìm kiếm mọi nơi có từ khóa
  const sql = "SELECT * FROM `room` WHERE name LIKE ?;";
  con.query(sql, [name], function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});
app.post('/', (req, res) => {
    const room_id = req.body.id;
    const name = req.body.name;
    const location = req.body.location;
    const class_group_id = req.body.class_group_id;    
    if (!name) {
        res.status(500).send("Tên trống!");
    }
    else {
        const sql = "INSERT INTO `room` (`room_id`, `name`, `location`, `class_group_id`) VALUES (?,?,?,?);";
        con.query(sql, [room_id, name,location,class_group_id], function (error, result) {
            if (error){
                res.status(500).send(error);
            res.json(result);
        }  return res.status(200).json({ ThongBao: 'Thành công' });
        })
    }
})

app.put('/:Id', (req, res) => {
    const room_id = req.params.Id;  // Sửa ở đây
    const name = req.body.name;
    const location = req.body.location;
    const class_group_id = req.body.class_group_id;  

    if (!name) {
        return res.status(400).send("Tên trống!");  // Sửa mã lỗi từ 500 thành 400
    }

    const sql = "UPDATE `room` SET `name` = ?, `location` = ?, `class_group_id` = ? WHERE (`room_id` = ?);";
    con.query(sql, [name, location, class_group_id, room_id], function (error, result) {
        if (error) {
            return res.status(500).send(error);
        }
        
        // Trả về dữ liệu đã cập nhật
        const updatedData = {
            room_id: room_id,
            name: name,
            location: location,
            class_group_id: class_group_id
        };
        return res.status(200).json(updatedData);
    });
});

app.delete('/:Id', (req, res) => {
    const id = req.params.Id;
    const sql = "DELETE FROM `room` WHERE room_id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error){
            res.status(500).send(error);
        res.json(result);
    }  return res.status(200).json({ ThongBao: 'Thành công' });
    })
})
module.exports = app;
