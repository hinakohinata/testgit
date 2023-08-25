
const connection = require('../config/db.config');

//all
const getAll = async (req, res) => {
    connection.query('SELECT * FROM book_types', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getAll');
        } else {
            res.json(results);
        }
    });
}
const getById = (req, res) => {
    const bookTypeId = req.params.id;
    const sql = 'SELECT * FROM book_types WHERE id = ?'
    connection.query(sql, [bookTypeId],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving ');
            } else {
                if (results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.status(404).send('BookType not found');
                }
            }
        });
}

// Add
const Add = async (req, res) => {
    const name = req.body.name
    const note = req.body.note
    if (!name) {
        return res.status(400).json({ ThongBao: 'Thiếu Tên' });
    }
    const sql = `INSERT INTO book_types (name, note) VALUES (?, ?)`
    connection.query(sql, [name, note], (error, results) => {
        if (error) {
            return res.status(500).json({ thongBao: error.thongBao });
        }
        return res.status(200).json({ ThongBao: 'Thành công' });
    });

}
const deleteBookType = async (req, res) => {

    const id = req.params.id;
    const query = "DELETE FROM book_types WHERE id = ?";
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ ThongBao: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ ThongBao: 'không có' });
        }
        return res.status(200).json({ ThongBao: 'Thành công' });
    });

}
const update = async (req, res) => {
    const id = req.params.id;
    const { name, note } = req.body;  
    const query = "UPDATE book_types SET name = ?, note = ? WHERE id = ?";
    connection.query(query, [name, note, id], (error, results) => {
        if (error) {
            return res.status(500).json({ thongBao: error.thongBao });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ thongBao: 'Không tìm thấy' });
        }
        return res.status(200).json({ thongBao: 'Cập nhật thành công' });
    });

}
module.exports = { getAll, Add, deleteBookType, update,getById
}