const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/add", orderController.createOrder);
router.get("/list", orderController.ListOrder);
router.get("/total-amount", orderController.TotalAmount);
router.get("/total-order", orderController.TotalOrder);
router.get("/monthly-amount", orderController.getMonthlyAmount);
router.put("/update-status/:id", orderController.updateOrderStatus);
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;