const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/read", userController.readUser);
router.put("/put", userController.updateUser);
router.delete("/delete", userController.deleteUser);

module.exports = router;
