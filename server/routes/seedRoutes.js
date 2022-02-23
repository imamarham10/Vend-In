const express = require('express');
const Product = require('../models/productModel');
const data = require('../Data');
const User = require('../models/userModel');

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    // await Product.deleteMany({});
    const createdProduct = await Product.insertMany(data.products);
    // await User.deleteMany({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdProduct, createdUser });
});

module.exports = seedRouter;
