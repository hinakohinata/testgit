const express = require('express');
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/author.controller');
const router = express.Router();

// Lấy tất cả authors
router.get('/', getAuthors);

// Lấy author theo id
router.get('/:id', getAuthorById);

// Tạo mới author
router.post('/', createAuthor);

// Cập nhật author
router.put('/:id', updateAuthor);

// Xóa author
router.delete('/:id', deleteAuthor);

module.exports = router;