const Food = require('../models/foodModel');

// Create and Save a new Food
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Food content can not be empty"
        });
    }

    const food = new Food({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        availability: req.body.availability
    });

    food.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Food."
            });
        });
};

// Retrieve and return all foods from the database.
exports.findAll = (req, res) => {
    Food.find()
        .then(foods => {
            res.send(foods);
        })
        .catch(err => {            res.status(500).send({
            message: err.message || "Some error occurred while retrieving foods."
        });
    });
};

// Update a food identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if (!req.body) {
    return res.status(400).send({
        message: "Food content can not be empty"
    });
}

Food.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    availability: req.body.availability
}, { new: true })
    .then(food => {
        if (!food) {
            return res.status(404).send({
                message: "Food not found with id " + req.params.id
            });
        }
        res.send(food);
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating food with id " + req.params.id
        });
    });
};

// Delete a food with the specified id in the request
exports.delete = (req, res) => {
Food.findByIdAndRemove(req.params.id)
    .then(food => {
        if (!food) {
            return res.status(404).send({
                message: "Food not found with id " + req.params.id
            });
        }
        res.send({ message: "Food deleted successfully!" });
    })
    .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete food with id " + req.params.id
        });
    });
};

