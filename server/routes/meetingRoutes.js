const express = require("express");
const router = express.Router();

const userController = require("../controllers/meetingController")

router.get("/test", userController.getTest)

module.exports = router;