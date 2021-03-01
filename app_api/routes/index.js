var express = require('express');
var router = express.Router();
const jwt = require('express-jwt')

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

/* GET home page. */
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip); 

router
    .route('/login')
    .post(authController.login)

router
    .route('/register')
    .post(authController.register)

router
    .route('/trips/:tripCode') //colon means its a parameter
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip);   
    
    
    
module.exports = router;