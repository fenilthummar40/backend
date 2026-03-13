const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userid: {type: String, required: true},
    item: {type: Array, required: true},
    amount: {type: Number, required: true},
    Payment: {type: Boolean, default: false},
    PaymentMethod: { type: String },
    status: { type: String, default: "pending" },

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    pin_code: {type: Number, required: true},
},
{ timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);

