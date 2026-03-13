const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    category: String,
    subcategory: String,
    size: [String],
    price: Number,
    stock: Number,
    status: String,
    bestseller: Boolean
});

module.exports = mongoose.model('Product', productSchema);
