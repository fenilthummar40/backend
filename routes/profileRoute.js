const express = require("express");
const profileController = require("../controllers/profileController");
const {deleteUser} = require("../controllers/userController");
const router = express.Router();

router.post("/add", profileController.createProfile);
router.get("/list", profileController.listProfile);
router.delete("/delete", deleteUser);

module.exports = router;