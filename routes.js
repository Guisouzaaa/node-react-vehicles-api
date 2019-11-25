const express = require('express');
const VehicleController = require('./Controllers/VehicleController');

const router = express.Router();

router.get('/vehicles', VehicleController.getVehicles)

router.get('/vehicles/:id', VehicleController.getVehiclesById)

router.post('/vehicles', VehicleController.createVehicle)

router.put('/vehicles/:id', VehicleController.updateVehiclePut)

router.patch('/vehicles/:id', VehicleController.updateVehiclePatch)

router.delete('/vehicles/:id', VehicleController.deleteVehicle)

module.exports = router;