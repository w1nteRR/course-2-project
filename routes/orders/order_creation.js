const config = require('../../config/server_cfg');
const order = require('../../models/order_model');

class OrderCreation {
    async tryCreateOrder(obj) {        
        const data = obj;
        console.log(data)
        const d = await config.query(`SELECT book_id FROM orders WHERE book_id = '${data.book_id}' LIMIT 0`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.createOrder(data);
    }

    async createOrder(d) {
        await order.createNewOrder(d.book_id, d.user_first_name, d.user_second_name, d.book_price, d.book_title, d.book_image);
    }
}
const createOrder = new OrderCreation();

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
      socket.on('addNewOrder', function (obj) {
       createOrder.tryCreateOrder(obj)
      });
    });
  }



