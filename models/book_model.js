const config = require('../config/server_cfg');

class Book {
    async createNewBook( title, author, publisher, price, description, review, image ) {
        await config.query(`INSERT INTO goods 
        (title, author, publisher, price, description, review, image, creation_date) VALUES 
        ('${title}', '${author}', '${publisher}', '${price}', '${description}', '${review}', '${image}', '${new Date().toLocaleString()}')`);

        config.log.debug(`New Book: ${title} | ${price} ${publisher}`);
    }
}

const book = new Book();
module.exports = book;

