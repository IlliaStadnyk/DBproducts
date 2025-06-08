// post.routes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandomProduct);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.addProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
