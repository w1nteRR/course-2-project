const config = require('../../config/server_cfg');
const order = require('../../models/order_model');

class OrderStatus {
    async tryUpdateToOngoing(obj) {        
        const data = obj;
        console.log(data)
        const d = await config.query(`SELECT id FROM orders WHERE user_id = ${data.id}`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.updateOrder(data);
    }
    async updateOrder(d) {
        await order.updateOrderToOngoing(d.status, d.id);
    }

    async tryCancelOrder(obj) {        
        const data = obj;
        console.log(data)
        const d = await config.query(`SELECT id FROM orders WHERE user_id = ${data.id}`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.cancelOrder(data);
    }
    async cancelOrder(d) {
        await order.cancelOrder(d.status, d.id);
    }

    async tryCompleteOrder(obj) {        
        const data = obj;
        console.log(data)
        const d = await config.query(`SELECT id FROM orders WHERE user_id = ${data.id}`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.completelOrder(data);
    }
    async completelOrder(d) {
        await order.completeOrder(d.status, d.id);
    }
}

const updateOrder = new OrderStatus();

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
        socket.on('updateToOngoing', function (obj) {
            updateOrder.tryUpdateToOngoing(obj)
        });

        socket.on('cancelOrder', function (obj) {
            updateOrder.tryCancelOrder(obj)
        });

        socket.on('completeOrder', function (obj) {
            updateOrder.tryCompleteOrder(obj)
        });
    });
  }



