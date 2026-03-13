const express = require("express");
const subscriptionpaymentController = require("../controllers/subscriptionpaymentController");
const router = express.Router();

router.post("/add", subscriptionpaymentController.createSubscriptionpayment);
router.get("/list" , subscriptionpaymentController.listSubscriptionpayment);

module.exports = router;