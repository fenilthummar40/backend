const Subscriptionpayment = require('../models/subscriptionpaymentModel');

exports.createSubscriptionpayment = async (req, res) => {
    try {
        const newSubscriptionpayment = await new Subscriptionpayment({
            userid: req.body.userid,
            price: req.body.price,

           first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
        });

        const savedSubscriptionpayment = await newSubscriptionpayment.save();

        res.status(201).json({
            success: true,
            product: savedSubscriptionpayment
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.listSubscriptionpayment = async (req, res) => {
    try {
        const Subscriptionpayments = await Subscriptionpayment.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            Subscriptionpayments
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
