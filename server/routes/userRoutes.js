const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/read", userController.readUser);
router.put("/put/password/:id", userController.updateUserPassword);
router.put("/put/email/:id", userController.updateUserEmail);
router.put("/put/group/:id", userController.updateUserGroup);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
