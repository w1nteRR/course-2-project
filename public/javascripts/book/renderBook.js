class DATA_BOOK_CONTROLLER {
    async get_Book_Data() {
       try {
         const data = await fetch('/boo');
         return data.text();
       } catch (error) {
         console.error('Error GET: ', error);
       }
     }
   }
 
 const book_controller = new DATA_BOOK_CONTROLLER();
 
 class Book {
     constructor(id ,title, author, publisher, price, description, review, image, creation_date) {
         this.id = id;
         this.title = title;
         this.author = author;
         this.publisher = publisher;
         this.price = price;
         this.description = description;
         this.image = image;
         this.review = review;
         this.creation_date = creation_date;
     }
 }
 
 const get_Book_Data = async () => {
   const get_book = await book_controller.get_Book_Data();
   console.log(get_book)

   JSON.parse(get_book).forEach(({ id, title, author, publisher, price, description, review, image, creation_date }) => {
    let ready_render_book = new Book(id, title, author, publisher, price, description, review, image, creation_date);
    $('#ss').prepend(
       render_book_head(ready_render_book),
         );
   });
}

 
 function render_book_head(book) { 
   let title = book.title
   let price = book.price
   let description = book.description
   let image = book.image
   
   return ` 
        <div class="book_title_container">
            <span class="book_title"><h2>${title}</h2></span>
        </div>
        <div class="book_main_container">
        <div class="book_image">
            <img src="/images/${image}" width="350" height="250" alt="">
        </div>
        <div class="book_description">
            <span class="book_description_style"><p>${description}</p></span>
        </div>
        <div class="price_btn_container">
            <div class="price_container">
                <span class="price_style"><p>₴ ${price}</p></span>
            </div>
            <div class="buy_btn">
                <img src="/images/shopping-cart.svg" width="20" height="20" alt="">
            </div>
        </div>
        </div>
       `
 }
 
 
 window.addEventListener('DOMContentLoaded', get_Book_Data);