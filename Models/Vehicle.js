const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicle: String,
    brand: String,
    year: Number,
    description: String,
    sold: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);