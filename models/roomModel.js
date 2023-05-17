const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    num_of_beds: Number,
    description: String,
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);
