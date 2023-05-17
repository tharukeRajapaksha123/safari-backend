const mongoose = require('mongoose');

const SafariSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Safari', SafariSchema);
