var express = require('express');
var router = express.Router();

const tripsController = require('../controllers/trips');

/* GET home page. */
router
    .route('/trips')
    .get(tripsController.tripsList); 

router
    .route('/trips/:tripCode') //colon means its a parameter
    .get(tripsController.tripsFindCode);    
    
module.exports = router;