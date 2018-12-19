const config = require('../../config/server_cfg');
const cart = require('../../models/cart_model');

class CartCreation {
    async tryCreateCart(obj) {        
        const data = obj;
        const d = await config.query(`SELECT book_id FROM cart WHERE book_id = '${data.book_id}' LIMIT 0`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.createCart(data);
    }

    async createCart(d) {
        await cart.createNewCart(d.book_id, d.book_price, d.book_title, d.book_image);
    }

    async tryClearCart(cart) {        
        const data = cart;
        const d = await config.query(`SELECT book_id FROM cart WHERE book_id = '${data.book_id}' LIMIT 0`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.clearCart(data);
    }

    async clearCart(d) {
        await cart.clearCart(d.id);
    }
}
const createCart = new CartCreation();

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
      socket.on('addToCart', function (obj) {
       createCart.tryCreateCart(obj)
       console.log(obj)
      });

      socket.on('clearCart', function (cart) {
        createCart.tryClearCart(cart)
       });
    });
  }



