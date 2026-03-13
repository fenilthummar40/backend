const mongoose = require("mongoose");

const subscriptionpaymentSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    price: {type: Number, required: true},

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
});

module.exports = mongoose.model('Subscriptionpayment', subscriptionpaymentSchema);
