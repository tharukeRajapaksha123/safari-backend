const Booking = require('../models/bookModel');

// Create and Save a new Booking
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Booking content can not be empty"
        });
    }

    const booking = new Booking({
        ...req.body
    });

    booking.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Booking."
            });
        });
};

// Retrieve and return all activities from the database.
exports.findAll = (req, res) => {
    Booking.find()
        .then(activities => {
            res.send(activities);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving activities."
            });
        });
};

// Update an booking identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Booking content can not be empty"
        });
    }

    Booking.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, { new: true })
        .then(booking => {
            if (!booking) {
                return res.status(404).send({
                    message: "Booking not found with id " + req.params.id
                });
            }
            res.send(booking);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Booking not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating booking with id " + req.params.id
            });
        });
};

// Delete an booking with the specified id in the request
exports.delete = (req, res) => {
    Booking.findByIdAndRemove(req.params.id)
        .then(booking => {
            if (!booking) {
                return res.status(404).send({
                    message: "Booking not found with id " + req.params.id
                });
            }
            res.send({ message: "Booking deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Booking not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete booking with id " + req.params.id
            });
        });
};

