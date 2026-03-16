const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userid: String,
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
    city: String,
    pin_code: Number,
    DOB: Date,
    address: String,
});

module.exports = mongoose.model('Profile', profileSchema);
