const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

// Mendapatkan semua genre
router.get('/', genreController.getAll);

// Mendapatkan genre berdasarkan ID
router.get('/:id_genre', genreController.getById);

// Menambahkan genre baru
router.post('/', genreController.create);

// Memperbarui genre berdasarkan ID
router.put('/:id_genre', genreController.update);

// Menghapus genre berdasarkan ID
router.delete('/:id_genre', genreController.delete);

module.exports = router;
