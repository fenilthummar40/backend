const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
    message: String,
});

module.exports = mongoose.model("Contact", contactSchema);