// Nhúng model Author 
const connection = require('../config/db.config');

// Lấy tất cả authors
const getAuthors = async (req, res) => {
    connection.query('SELECT * FROM authors', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving authors');
        } else {
            res.json(results);
        }
    });
}

// Lấy author theo id
const getAuthorById = (req, res) => {
    const authorId = req.params.id;
    const sql = 'SELECT * FROM authors WHERE id = ?'
    connection.query(sql, [authorId],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving author');
            } else {
                if (results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.status(404).send('Author not found');
                }
            }
        });
}

// Thêm mới author
const createAuthor = async (req, res) => {
    // code xử lý thêm author
    const name = req.body.name
    const biography = req.body.biography

    // Kiểm tra dữ liệu hợp lệ
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    // Query để insert author 
    const sql = `INSERT INTO authors (name, biography) VALUES (?, ?)`
    connection.query(sql, [name, biography], (error, results) => {

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        // Author đã được tạo thành công
        const author = { id: results.insertId, name, biography };
        return res.status(201).json(author);

    });

}

// Cập nhật author
const updateAuthor = async (req, res) => {

    // Lấy id từ params
    const id = req.params.id;

    // Lấy dữ liệu từ body
    const { name, biography } = req.body;

    // Câu truy vấn update
    const query = "UPDATE authors SET name = ?, biography = ? WHERE id = ?";

    // Thực thi query 
    connection.query(query, [name, biography, id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.status(200).json({ message: 'Author updated successfully' });
    });

}

// Xóa author
const deleteAuthor = async (req, res) => {
    // code xóa author dựa trên id

    // Lấy id từ params 
    const id = req.params.id;

    // Câu truy vấn
    const query = "DELETE FROM authors WHERE id = ?";

    // Thực thi query
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.status(200).json({ message: 'Author deleted successfully' });
    });

}

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}