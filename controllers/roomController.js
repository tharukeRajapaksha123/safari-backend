const Room = require('../models/roomModel');

// Create and Save a new Room
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Room content can not be empty"
        });
    }

    const room = new Room({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        num_of_beds: req.body.num_of_beds,
        description: req.body.description,
       
    });

    room.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Room."
            });
        });
};

// Retrieve and return all rooms from the database.
exports.findAll = (req, res) => {
    Room.find()
        .then(rooms => {
            res.send(rooms);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rooms."
            });
        });
};

// Update a room identified by the roomId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Room content can not be empty"
        });
    }

    Room.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        num_of_beds: req.body.num_of_beds,
        description: req.body.description,
        available : req.body.available
    }, { new: true })
        .then(room => {
            if (!room) {
                return res.status(404).send({
                    message: "Room not found with id " + req.params.id
                });
            }
            res.send(room);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Room not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating room with id " + req.params.id
            });
        });
};

// Delete a room with the specified roomId in the request
exports.delete = (req, res) => {
    Room.findByIdAndRemove(req.params.id)
        .then(room => {
            if (!room) {
                return res.status(404).send({
                    message: "Room not found with id " + req.params.id
                });
            }
            res.send({ message: "Room deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Room not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete room with id " + req.params.id
            });
        });
};
