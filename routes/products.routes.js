// post.routes.js

const express = require('express');
const router = express.Router();
const Product = require("../models/product.model.js");

router.get('/products', async (req, res) => {
  try {
      res.json(await Product.find())
  }
  catch (error) {
      res.status(500).json(error);
  }
});

router.get('/products/random', async (req, res) => {
  try {
      const count = await Product.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const product = await Product.findOne().skip(rand);

      if(!product) res.status(404).json({ message: 'Not found' });
      else res.json(product);
  }
  catch (error) {
      res.status(500).json(error);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if(!product) res.status(404).json({ message: 'Not found' });
      else res.json(product);
  }
  catch (error) {
      res.status(500).json(error);
  }
});

router.post('/products', async (req, res) => {
  try {
      const { name, client } = req.body;
      const newProduct = new Product(name, client);
      newProduct.save();
      res.json({message: 'Product added successfully.'});
  }
  catch (error) {
      res.status(500).json(error);
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        await Product.updateOne({ _id: req.params.id }, { $set: { name, client }});
        res.json({message: 'Product updated successfully.'});
    }
    else res.json({message: 'Product not found'});
  }
  catch (error) {
      res.status(500).json(error);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if(product){
          product.remove();
          res.json({message: 'Product deleted successfully.'});
      }
      else res.json({message: 'Product not found'});
  }
  catch (error) {
      res.status(500).json(error);
  }
});

module.exports = router;
