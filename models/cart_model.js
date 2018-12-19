const config = require('../config/server_cfg');
var connection = require('../config/db_cfg')


class Cart {
    async createNewCart( book_id, book_price, book_title, book_image, count, creation_date ) {
        console.log(book_image)
        await config.query(`INSERT INTO cart 
        (book_id, book_price, book_title, book_image, creation_date) VALUES 
        ('${book_id}', '${book_price}', '${book_title}', '${book_image}', '${new Date().toLocaleString()}')`);

        config.log.debug(`New Cart: ${book_id} | ${new Date().toLocaleString()}`);
    }

    async clearCart( id ) {
        var getId = id;
        console.log(getId)
        await config.query('DELETE FROM cart WHERE id = ' + connection.escape(getId))
        
        config.log.debug(`Cart has been cleared: ${new Date().toLocaleString()}`);
    }
}

const cart = new Cart();
module.exports = cart;

