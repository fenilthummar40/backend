const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
    feedback: String,
});

module.exports = mongoose.model("feedback", feedbackSchema);