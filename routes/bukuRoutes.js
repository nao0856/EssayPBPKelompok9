const express = require('express');
const bukuController = require('../controllers/bukucontroller');  // Perbaiki impor jika perlu
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, bukuController.getAll);
router.get('/:id_buku', authMiddleware, bukuController.getById);
router.post('/', authMiddleware, bukuController.create);
router.delete('/:id_buku', authMiddleware, bukuController.delete);

module.exports = router;