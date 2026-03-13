const express = require("express");
const router = express.Router();
const { registerUser, loginUser, deleteUser, ListUsers , TotalUsers} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list" , ListUsers);
router.get("/total-users", TotalUsers);
router.delete("/delete", deleteUser);

module.exports = router;