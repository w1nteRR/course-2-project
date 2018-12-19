const config = require('../../config/server_cfg');
const book = require('../../models/book_model');

class BookCreation {
    async tryCreateBook(obj) {
        const data = obj;
        const d = await config.query(`SELECT title FROM goods WHERE title = '${data.title}' LIMIT 1`);
        if (d[0]) {
            return this.showError("Something wrong. Try again");
        }
        this.createBook(data);
    }

    async createBook(d) {
        await book.createNewBook(d.title, d.author, d.publisher, d.price, d.description, d.review, d.image);
    }

}
const createBook = new BookCreation();

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
      socket.on('createBook', function (obj) {
        createBook.tryCreateBook(obj)
      });
    });
  }



