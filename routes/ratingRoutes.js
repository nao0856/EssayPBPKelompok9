const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

// Mendapatkan semua rating
router.get('/', ratingController.getAll);

// Mendapatkan rating berdasarkan ID buku
router.get('/:id_buku', ratingController.getRatings);

// Menambahkan rating baru
router.post('/', ratingController.create);

// Memperbarui rating
router.put('/', ratingController.update);

// Menghapus rating berdasarkan pengguna dan buku
router.delete('/:id_pengguna/:id_buku', ratingController.delete);

module.exports = router;
