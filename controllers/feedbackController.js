const Feedback = require("../models/feedback.Model");

exports.createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            feedback: req.body.feedback,
        });

        const savedFeedback = await newFeedback.save();

        res.status(201).json({
            success: true,
            contact: savedFeedback
        });

    } catch (error){
        res.status(500).json({message: error.message});
    }
}

exports.listFeedbacks = async (req, res) => {
    try {
        const Feedbacks = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            Feedbacks
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}