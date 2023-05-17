const Activity = require('../models/activitiesModel');

// Create and Save a new Activity
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Activity content can not be empty"
        });
    }

    const activity = new Activity({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    });

    activity.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Activity."
            });
        });
};

// Retrieve and return all activities from the database.
exports.findAll = (req, res) => {
    Activity.find()
        .then(activities => {
            res.send(activities);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving activities."
            });
        });
};

// Update an activity identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Activity content can not be empty"
        });
    }

    Activity.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    }, { new: true })
        .then(activity => {
            if (!activity) {
                return res.status(404).send({
                    message: "Activity not found with id " + req.params.id
                });
            }
            res.send(activity);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Activity not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating activity with id " + req.params.id
            });
        });
};

// Delete an activity with the specified id in the request
exports.delete = (req, res) => {
    Activity.findByIdAndRemove(req.params.id)
        .then(activity => {
            if (!activity) {
                return res.status(404).send({
                    message: "Activity not found with id " + req.params.id
                });
            }
            res.send({ message: "Activity deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Activity not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete activity with id " + req.params.id
            });
        });
};

