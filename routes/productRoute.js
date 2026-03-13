const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/add', upload.single('image'), productController.createProduct);
router.put("/update/:id", upload.single("image"), productController.updateProduct);
router.get('/list', productController.listProduct);
router.delete('/delete/:id' , productController.deleteProduct)
router.put('/update/:id', productController.updateProduct);
router.get("/total-product", productController.TotalProduct);
router.get("/:id", productController.getSingleProduct);

router.get("/single/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.json({ success: false, message: "Not found" });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});


module.exports = router;
