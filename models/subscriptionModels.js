const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    status : { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: String, required: true },
    premium: { type: String, required: true },
    build: { type: String, required: true },
    processing: { type: String, required: true },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
