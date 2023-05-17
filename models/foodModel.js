const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    availability: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', FoodSchema);
