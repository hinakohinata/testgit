const express = require('express');
const { getAll, Add, deleteBookType,update,getById } = require('../controllers/bookTypes.controller');
const router = express.Router();
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', Add);
router.delete('/:id', deleteBookType);
router.put('/:id', update);
module.exports = router;