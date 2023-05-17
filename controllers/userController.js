const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

// Register a new User
exports.register = (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status(400).send({
            message: "Required field can not be empty"
        });
    }

    // Create a new User
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    // Save User in the database
    user.save()
        .then(data => {
            const token = jwt.sign({ id: data._id }, 'your-secret-key', { expiresIn: 86400 }); // expires in 24 hours
            res.send({ auth: true, token: token });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Login a User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JSON Web Token (JWT)
        const token = jwt.sign({ userId: user._id }, 'your-secret-key');

        return res.json({ token, user });
    } catch (error) {
        console.error('Failed to login', error);
        return res.status(500).json({ message: 'Failed to login' });
    }
};

exports.getOneUser = async (req, res) => {
    const id = req.params.id;
    return await userModel.findById(id).then((user) => {
        if (!user) {
            return res.status(404).json({ "message": "user not found" })
        } else {
            return res.status(200).json({ user })
        }
    }).catch(err => res.status(500).json({ err }))
}
exports.getUsers = async (req, res) => {
    return await userModel.find().then((users) => {
        return res.status(200).json({ users })
    }).catch(err => res.status(500).json({ err }))
}

