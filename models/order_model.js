const config = require('../config/server_cfg');
var connection = require('../config/db_cfg')

class Order {
    async createNewOrder( book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, total_price, creation_date ) {
        await config.query(`INSERT INTO orders 
        (book_id, user_first_name, user_second_name, book_price, book_title, book_image, creation_date ) VALUES 
        ('${book_id}', '${user_first_name}', '${user_second_name}', '${book_price}', '${book_title}', '${book_image}', '${new Date().toLocaleString()}')`);

        config.log.debug(`New Order: ${book_id} ${user_first_name} ${user_second_name} | ${new Date().toLocaleString()}`);
    }
    
    async updateOrderToOngoing( status, id, creation_date ) {
        var getId = id;
        console.log(getId)
        await config.query('UPDATE orders SET status = 2 WHERE id = ' + connection.escape(getId))

        config.log.debug(`New Status: ${status} | ${new Date().toLocaleString()}`);
    }

    async cancelOrder( status, id, creation_date ) {
        var getId = id;
        console.log(getId)
        await config.query('UPDATE orders SET status = 4 WHERE id = ' + connection.escape(getId))

        config.log.debug(`New Status: ${status} | ${new Date().toLocaleString()}`);
    }
    
    async completeOrder( status, id ) {
        var getId = id;
        console.log(getId)
        await config.query('UPDATE orders SET status = 3 WHERE id = ' + connection.escape(getId))

        config.log.debug(`New Status: ${status} | ${new Date().toLocaleString()}`);
    }
}

const order = new Order();
module.exports = order;

