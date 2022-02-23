/* eslint-disable no-new */
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const seedRouter = require('./server/routes/seedRoutes');
const productRouter = require('./server/routes/productRoutes');
const userRouter = require('./server/routes/userRoutes');
const orderRouter = require('./server/routes/orderRoutes');
const uploadRouter = require('./server/routes/uploadRoutes');

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`connected to DB`);
    })
    .catch((error) => {
        console.log(error.message);
    });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${port}`);
});
