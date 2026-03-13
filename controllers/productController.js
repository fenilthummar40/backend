const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            image: req.file ? req.file.filename : null,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            subcategory: req.body.subcategory,
            size: JSON.parse(req.body.size),
            price: req.body.price,
            stock: req.body.stock,
            status: req.body.status,
            bestseller: req.body.bestseller
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            product: savedProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.listProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            subcategory: req.body.subcategory,
            price: req.body.price,
            stock: req.body.stock,
            status: req.body.status,
            bestseller: req.body.bestseller
        };

        if (req.body.size) {
            updateData.size =
                typeof req.body.size === "string"
                    ? JSON.parse(req.body.size)
                    : req.body.size;
        }

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.TotalProduct = async (req, res) => {
    try {
        const totalProduct = await Product.countDocuments();

        res.json({
            success: true,
            totalProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};