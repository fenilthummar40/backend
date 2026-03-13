const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const router = express.Router();

router.post("/add" , feedbackController.createFeedback);
router.get("/list" , feedbackController.listFeedbacks);

module.exports = router;
