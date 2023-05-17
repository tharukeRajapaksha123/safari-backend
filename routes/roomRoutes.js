const express = require("express")
const controllers = require("../controllers/roomController")
const router = express.Router()

router.get("/",controllers.findAll)
router.post("/",controllers.create)
router.put("/:id",controllers.update)
router.delete("/:id",controllers.delete)

module.exports = router