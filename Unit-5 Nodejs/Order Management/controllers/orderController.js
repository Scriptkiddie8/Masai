const Order = require("../models/order");

exports.getShippedOrders = async (req, res) => {
  const orders = await Order.find({ order_status: "shipped" });
  res.json(orders);
};

exports.updateTotalAmount = async (req, res) => {
  const result = await Order.updateOne(
    { order_id: 1 },
    { total_amount: 70000 }
  );
  res.json(result);
};

exports.deleteOrder4 = async (req, res) => {
  const result = await Order.deleteOne({ order_id: 4 });
  res.json(result);
};

exports.getOrderByCustomer = async (req, res) => {
  const order = await Order.findOne({ customer_name: "Alice Johnson" });
  res.json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const result = await Order.updateOne(
    { order_id: 2 },
    { order_status: "delivered" }
  );
  res.json(result);
};

exports.getHighValueOrders = async (req, res) => {
  const orders = await Order.find({ total_amount: { $gte: 1500 } });
  res.json(orders);
};
