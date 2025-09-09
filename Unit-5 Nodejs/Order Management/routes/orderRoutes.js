const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.get("/shipped", controller.getShippedOrders);
router.put("/update-total", controller.updateTotalAmount);
router.delete("/delete-order4", controller.deleteOrder4);
router.get("/customer-alice", controller.getOrderByCustomer);
router.put("/update-status", controller.updateOrderStatus);
router.get("/high-value", controller.getHighValueOrders);

module.exports = router;
