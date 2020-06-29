const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/read", userController.readUser);
router.put("/put/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
