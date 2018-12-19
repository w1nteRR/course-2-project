var socket = io.connect('http://localhost:3000');

add = (book) => {
 const book_id = book.dataset.id;
 const book_price = book.dataset.price;
 const book_title = book.dataset.title;
 const book_image = book.dataset.image;
 
 const obj = JSON.stringify ({
     book_id: book_id,
     book_price: book_price,
     book_title: book_title,
     book_image: book_image
 })
 socket.emit('addToCart', JSON.parse(obj));
 console.log(obj)
}