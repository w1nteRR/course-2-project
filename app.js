const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/db_cfg')
const indexRouter = require('./routes/index');
const books = require('./routes/books/books_data')
const carts = require('./routes/cart/cart_data')
const orders = require('./routes/orders/order_data')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const book = require('./routes/books/book_creation')(io)
const cart = require('./routes/cart/cart_creation')(io)
const order = require('./routes/orders/order_creation')(io)
const order_status = require('./routes/orders/order_status')(io)

http.listen(3000, "127.0.0.1")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter)
app.use('/', books)
app.use('/', carts)
app.use('/', orders)


module.exports = app;
