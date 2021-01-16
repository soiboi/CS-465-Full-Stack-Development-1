var express = require('express');
var router = express.Router();
const control = require('../controllers/main')

/* GET home page. */
router.get('/', control.index); 

module.exports = router;
