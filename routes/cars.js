const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars');

router.get('/getAllCars', cars.getAllCars);
router.get('/getCarById/:carId', cars.getCarById);
router.post('/createCar', cars.createCar);
router.put('/updateCar', cars.updateCar);
router.delete('/deleteCar/:carId', cars.deleteCar);

module.exports = router;