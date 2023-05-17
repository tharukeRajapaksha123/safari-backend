"use strict";
const Logging = require("./library/logging.js")
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const cors = require("cors");

const router = express();
router.use(cors());

/* Controllers */
const safariController = require("./routes/safariRoutes");
const roomController = require("./routes/roomRoutes");
const activityController = require("./routes/activityRoutes.js");
const userController = require("./routes/userRoute.js");
const foodController = require("./routes/foodRoutes.js");
const bookController = require("./routes/bookRoutes.js")

const db_url = "mongodb+srv://root:root@cluster0.spmcifx.mongodb.net"
const port = 8080;

/* Connect to Mongo */
mongoose
    .connect(db_url)
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch(err => {
        Logging.error(err);
    });

/** Only start the server if Mongo connects */

const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the request */
        Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the response */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next(); /**allow passing through the middleware to the next tasks */
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use("/safari-controller", safariController)
    router.use("/food-controller", foodController)
    router.use("/activity-controller", activityController)
    router.use("/user-controller", userController)
    router.use("/room-controller", roomController)
    router.use("/book-controller",bookController)

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    const server = http.createServer(router);
    server.listen(port, () => {
        Logging.info(`Server is running on port ${port}`);
    });
};


