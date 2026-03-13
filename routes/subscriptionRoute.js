const express = require("express");
const subscriptionController = require("../controllers/subscriptionController");
const router = express.Router();

router.post("/add", subscriptionController.createSubscription);
router.get("/list", subscriptionController.listSubscription);
router.put("/update/:id", subscriptionController.updateSubscription);
router.delete("/delete/:id", subscriptionController.deleteSubscription);

module.exports = router;