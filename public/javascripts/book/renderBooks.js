class DATA_BOOKS_CONTROLLER {
    async get_Books_Data() {
       try {
         const data = await fetch('/book-data');
         return data.text();
       } catch (error) {
         console.error('Error GET: ', error);
       }
     }
   }
 
 const books_controller = new DATA_BOOKS_CONTROLLER();
 
 class Books {
     constructor(id ,title, author, publisher, price, description, review, image, creation_date) {
         this.id = id;
         this.title = title;
         this.author = author;
         this.publisher = publisher;
         this.price = price;
         this.description = description;
         this.review = review;
         this.image = image;
         this.creation_date = creation_date;
     }
 }
 
 const get_Books_Data = async () => {
   const get_books = await books_controller.get_Books_Data();
 
   JSON.parse(get_books).forEach(({ id, title, author, publisher, price, description, review, image, creation_date }) => {
     let ready_render_books = new Books(id, title, author, publisher, price, description, review, image, creation_date);
     $('#ss').prepend(
        render_books(ready_render_books),
          );
    });
 }
 
 function render_books(book) { 
   let title = book.title
   let author = book.author
   let price = book.price
   let id = book.id
   let creation_date = book.creation_date;
   let image = book.image
      
   return ` 
         <div class="book_card">
            <span class="book_title"><h2>${title}</h2></span>
            <a href="/book/${id}"><div class="book_image">
                 <img src="/images/${image}" width="160" height="260" alt="">
             </div>
             </a>
             <div class="good_nav">
                 <div class="first_part">
                     <div class="">
                         <span class="price_style" id="s_price">₴ ${price}</span>
                     </div>
                 </div>
                 <div class="second_part">
                     <form class="add_cart_container" id="bb">
                         <button class="add_cart_btn_style goods_btn" id="aa" onclick="add(this)" data-image=${image} data-title=${title} data-id=${id} data-price=${price}>
                             <img src="./images/shopping-cart.svg" width="10" height="10" alt="">
                         </button>
                     </form>
                     <div class="buy_now_container">
                         <button class="buy_now_btn_styl goods_btn">
                             <img src="./images/shopping-purse-icon.svg" width="10" height="10" alt="">
                         </button>
                     </div>
                 </div>
             </div>
         </div>
       `
 }
 
 
 window.addEventListener('DOMContentLoaded', get_Books_Data);