var socket = io.connect('http://localhost:3000');

class DATA_CART_CONTROLLER {
    async get_Cart_Data() {
       try {
         const data = await fetch('/cart-data');
         return data.text();
       } catch (error) {
         console.error('Error GET: ', error);
       }
     }
   }
 
 const cart_controller = new DATA_CART_CONTROLLER();
 
 class Cart {
     constructor(id, user_id, book_id, book_price, count, book_title, book_image, creation_date) {
         this.id = id;
         this.user_id = user_id;
         this.book_id = book_id;
         this.book_price = book_price;
         this.book_title = book_title;
         this.count = count;
         this.book_image = book_image;
         this.creation_date = creation_date;
     }
 }
 
 const get_Cart_Data = async () => {
   const get_cart = await cart_controller.get_Cart_Data();
    
   JSON.parse(get_cart).forEach(({ id, user_id, book_id, book_price, book_title, count, book_image, creation_date}) => {
    let ready_render_cart = new Cart(id, user_id, book_id, book_price, book_title, count, book_image, creation_date);
    $('#modal-content').prepend(
        render_cart(ready_render_cart),
          );
    $('#book_container_order').prepend(
        render_cart_order(ready_render_cart),
        );
    });
 }

push = async () => {
    const get_cart = await cart_controller.get_Cart_Data();
    const user_first_name = document.getElementById('first_name_input');
    const user_second_name = document.getElementById('first_second_input');
    
    JSON.parse(get_cart).forEach(({ id, book_id, book_price, book_image, book_title}) => {
        var id = id;
        var book_id = book_id;
        var book_price = book_price;
        var book_image = book_image;
        var book_title = book_title;

        const obj = JSON.stringify ({
            book_id: book_id,
            book_price: book_price,
            book_image: book_image,
            book_title: book_title,
            user_first_name: user_first_name.value,
            user_second_name: user_second_name.value,
        })

        const cart = JSON.stringify ({
            id: id
        })
        socket.emit('addNewOrder', JSON.parse(obj));
        console.log(obj)
        alert('Nice! We got your order!')
        window.location.href = "/";
        
        socket.emit('clearCart', JSON.parse(cart));
    })
 }
 
 
 function render_cart(cart) { 
   let book_id = cart.book_id
   let book_price = cart.book_price
   let count = cart.count
   let book_image = cart.book_image
   let id = cart.id
   let book_title = cart.book_title
   
   return ` 
        <div class="book_container" >
            <div>
                <button class="delete_btn"><img src="./images/error.svg" width="13" height="13" alt=""></button>
            </div>
            <div>
                <p>${count}</p>
            </div>
            <div class="book_image">
                <img src="/images/${book_image}" width="60" height="160" alt="">
            </div>
            <div class="book_amount_container">
                <button><img src="./images/minus.svg" width="13" height="13" alt=""></button>
                <input class="book_amount" type="text" placeholder="${book_title}">
                <button><img src="./images/plus.svg" width="13" height="13" alt=""></button>
            </div>
            <div class="price">
                <span class=""><p>${book_price}</p></span>
                <span class=""><p>${book_id}</p></span>
            </div>
        </div>
       `
 }

 function render_cart_order(cart) { 
    let book_id = cart.book_id
    let price = cart.book_price
    let book_image = cart.book_image
    let id = cart.id

    
    return ` 
        <div class="book_order_">
            <div class="book_image_order">
                <img src="/images/${book_image}" width="100" height="200" alt="">
            </div>
            <div class="price_order" id="s">
                <span class="price_style">${price}</span>
                <span class="">${book_id}</span>
            </div>
        </div>
        `
  }
  
 window.addEventListener('DOMContentLoaded', get_Cart_Data);
