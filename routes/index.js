const express = require('express');
const router = express.Router();
const _dirname = 'D:/yura_bookshop';
const book_creation = require('./books/book_creation')
const cart_creation = require('./cart/cart_creation')
const order_creation = require('./orders/order_creation')
const connection = require('../config/db_cfg')

router.get('/', (req, res) => {
  res.sendFile(_dirname + '/public/index.html');
});

router.get('/admin', (req, res) => {
  res.sendFile(_dirname + '/public/admin.html');
});

router.get('/book/:id', function(req, res) {
  res.sendFile(_dirname + '/public/book.html')
});

router.get('/cart', function(req, res) {
  res.sendFile(_dirname + '/public/cart.html')
});

router.get('/order', function(req, res) {
  res.sendFile(_dirname + '/public/order.html')
});

router.get('/orders/new', function(req, res) {
  res.sendFile(_dirname + '/public/order_new.html')
});

router.get('/orders/ongoing', function(req, res) {
  res.sendFile(_dirname + '/public/order_ongoing.html')
});

router.get('/orders/done', function(req, res) {
  res.sendFile(_dirname + '/public/order_done.html')
});

router.get('/orders/canceled', function(req, res) {
  res.sendFile(_dirname + '/public/order_canceled.html')
});

router.get('/orders/test', function(req, res) {
  res.sendFile(_dirname + '/public/order_test.html')
});



module.exports = router;
