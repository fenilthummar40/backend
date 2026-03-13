const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            userid: req.body.userid,
            item:req.body.item,
            amount: req.body.amount,
            payment: req.body.payment,
            PaymentMethod: req.body.PaymentMethod,
            status: req.body.status,

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            pin_code: req.body.pin_code,
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            profile: savedOrder
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


exports.ListOrder = async (req, res) => {
    try {
        const Orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            Orders
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.TotalAmount = async (req, res) => {
    try {
        const orders = await Order.find();

        const totalAmount = orders.reduce((sum, order) => {
            return sum + order.amount;
        }, 0);

        res.json({
            success: true,
            totalAmount: totalAmount
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.TotalOrder = async (req, res) => {
    try {
        const totalOrder = await Order.countDocuments();

        res.json({
            success: true,
            totalOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteOrder = await Order.findByIdAndDelete(id);

        if (!deleteOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );

        res.json({
            success: true,
            message: "Order status updated",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating order"
        });
    }
};


exports.getMonthlyAmount = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    amount: 1
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const monthlyAmounts = new Array(12).fill(0);

        orders.forEach(order => {
            monthlyAmounts[order._id - 1] = order.total;
        });

        res.json({
            success: true,
            monthlyAmounts
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false
        });
    }
};