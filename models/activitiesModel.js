const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);
