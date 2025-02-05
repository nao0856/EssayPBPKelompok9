const express = require('express');
const publicController = require('../controllers/publicController');

const router = express.Router();


router.get('/search', publicController.searchBook);



module.exports = router;
