/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { isAdmin, isAuth, isSellerOrAdmin } = require('../utils');
const data = require('../Data');
const User = require('../models/userModel');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    // console.log(Product);
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({ ...sellerFilter }).populate('seller', 'seller.name seller.logo');
    res.send(products);
});

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        const seller = await User.findOne({ isSeller: true });
        if (seller) {
            const products = data.products.map((product) => ({
                ...product,
                seller: seller._id,
            }));
            const createdProducts = await Product.insertMany(products);
            res.send({ createdProducts });
        } else {
            res.status(500).send({ message: 'No seller found. first run /api/users/seed' });
        }
    }),
);
// productRouter.get("/slug/:slug", async (req, res) => {
//   const product = await Product.findOne({ slug: req.params.slug });
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Error 404 : Product not found" });
//   }
// });

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate(
            'seller',
            'seller.name seller.logo seller.rating seller.numReviews',
        );
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }),
);
// productRouter.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Error 404 : Product Not Found" });
//   }
// });

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            const deleteProduct = await product.remove();
            res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }),
);

productRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: `sample name ${Date.now()}`,
            seller: req.user._id,
            image: '/images/p1.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
        });
        const createdProduct = await product.save();
        res.send({ message: 'Product Created', product: createdProduct });
    }),
);

productRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            const updatedProduct = await product.save();
            res.send({ message: 'Product Updated', product: updatedProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }),
);
productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            if (product.reviews.find((x) => x.name === req.user.name)) {
                return res.status(400).send({ message: 'You already submitted a review' });
            }
            const review = {
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: 'Review Created',
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }),
);
module.exports = productRouter;
