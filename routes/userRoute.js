const express = require("express")
const controllers = require("../controllers/userController")
const router = express.Router()

router.post("/",controllers.register)
router.post("/login",controllers.login)
router.get("/:id",controllers.getOneUser)
router.get("/",controllers.getUsers);

module.exports = router