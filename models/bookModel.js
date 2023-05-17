const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        trim: true,
        default: ""
    },
    selectedActivities: {
        type: [String],
        default: []
    },
    selectedFoods: {
        type: [String],
        default: []
    },
    selectedRooms: {
        type: [String],
        default: []
    },
    selectedSafaris: {
        type: [String],
        default: []
    }
});

const UserSelection = mongoose.model('Bookings', BookingSchema);

module.exports = UserSelection;
