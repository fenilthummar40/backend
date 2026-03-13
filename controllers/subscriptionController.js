const Subscription = require('../models/subscriptionModels');

exports.createSubscription = async (req, res) => {
    try {
        const newSubscription = await new Subscription({
            status: req.body.status,
            price: req.body.price,
            discount: req.body.discount,
            premium: req.body.premium,
            build: req.body.build,
            processing: req.body.processing,
        });

        const savedSubscription = await newSubscription.save();

        res.status(201).json({
            success: true,
            product: savedSubscription
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.listSubscription = async (req, res) => {
    try {
        const subscriptions = await Subscription.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            subscriptions
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.deleteSubscription = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedSubscription = await Subscription.findByIdAndDelete(id);

        if (!deletedSubscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateSubscription = async (req, res) => {
    try {
        const {id} = req.params;
        const {status, price, discount, premium, build, processing} = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Subscription ID is required"
            });
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            id,
            {status, price, discount, premium, build, processing},
            {new: true}
        );

        if (!updatedSubscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            subscription: updatedSubscription
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};