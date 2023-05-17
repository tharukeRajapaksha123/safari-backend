const Safari = require('../models/safariModel');

// Create and Save a new Safari
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Safari content can not be empty"
        });
    }

    const safari = new Safari({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    });

    safari.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Safari."
            });
        });
};

// Retrieve and return all safaris from the database.
exports.findAll = (req, res) => {
    Safari.find()
        .then(safaris => {
            res.send(safaris);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving safaris."
            });
        });
};

// Update a safari identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Safari content can not be empty"
        });
    }

    Safari.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }, { new: true })
        .then(safari => {
            if (!safari) {
                return res.status(404).send({
                    message: "Safari not found with id " + req.params.id
                });
            }
            res.send(safari);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Safari not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating safari with id " + req.params.id
            });
        });
};


// Delete a safari with the specified id in the request
exports.delete = (req, res) => {
    Safari.findByIdAndRemove(req.params.id)
        .then(safari => {
            if (!safari) {
                return res.status(404).send({
                    message: "Safari not found with id " + req.params.id
                });
            }
            res.send({ message: "Safari deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Safari not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete safari with id " + req.params.id
            });
        });
};

