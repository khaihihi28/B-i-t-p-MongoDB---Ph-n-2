const mongoose = require('mongoose')
const carsSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    nam: {
        type: Number
    },
    giaban: {
        type: Number,
        default: 0
    }
})
const cars = mongoose.model('cars', carsSchema);
module.exports = cars;