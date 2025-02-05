const express = require('express');
const anggotaController = require('../controllers/anggotaController'); // 🔥 Pastikan path benar!

console.log("anggotaController:", anggotaController); // 🔍 Debugging

const router = express.Router();

router.post('/register', anggotaController.register);
router.post('/login', anggotaController.login);
router.get('/', anggotaController.getAll); 
router.get('/:id', anggotaController.getById); 
router.put('/:id', anggotaController.update); 
router.delete('/:id', anggotaController.delete);

module.exports = router;
