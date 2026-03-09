const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address } = req.body;
    
    // req.user context ya middleware se aayega (jo login user ki ID hogi)
    const newOrder = new Order({
      user: req.user._id, 
      items,
      totalAmount,
      address,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Order failed", error: error.message });
  }
};