const router = require("express").Router();
const os = require("os");
const userController = require("./controllers/userController");

router.post("/socialMedia/createUser", userController.createUser);

module.exports = router;
