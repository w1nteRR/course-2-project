const socket = io.connect('http://localhost:3000');

class DATA_ORDER_CONTROLLER {
    async get_Order_New_Data() {
       try {
         const data = await fetch('/status/new');
         return data.text();
       } catch (error) {
         console.error('Error GET: ', error);
       }
     }

    async get_Order_Ongoing_Data() {
        try {
            const data = await fetch('/status/ongoing');
            return data.text();
        } catch (error) {
            console.error('Error GET: ', error);
        }
    }
    
    async get_Order_Done_Data() {
        try {
            const data = await fetch('/status/done');
            return data.text();
        } catch (error) {
            console.error('Error GET: ', error);
        }
    }

    async get_Order_Canceled_Data() {
        try {
            const data = await fetch('/status/canceled');
            return data.text();
        } catch (error) {
            console.error('Error GET: ', error);
        }
    }
}
 
 const order_controller = new DATA_ORDER_CONTROLLER();
 
 class Order {
     constructor(id, user_id, book_id, user_first_name, user_second_name, book_title, book_price, book_image, status, count, creation_date) {
         this.id = id;
         this.user_id = user_id;
         this.book_id = book_id;
         this.book_price = book_price;
         this.book_title = book_title;
         this.book_image = book_image;
         this.status = status;
         this.count = count;
         this.user_first_name = user_first_name;
         this.user_second_name = user_second_name;
         this.creation_date = creation_date;
     }
 }
 
const get_Order_New_Data = async () => {
    const get_order = await order_controller.get_Order_New_Data();

JSON.parse(get_order).forEach(({id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date}) => {
    let ready_render_new_order = new Order(id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date);
    $('#ss').prepend(
        render_new_order(ready_render_new_order),
        );
    });
}

const get_Order_Ongoing_Data = async () => {
    const get_order = await order_controller.get_Order_Ongoing_Data();

JSON.parse(get_order).forEach(({id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date}) => {
    let ready_render_ongoing_order = new Order(id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date);
    $('#aa').prepend(
        render_ongoing_order(ready_render_ongoing_order),
        );
    });
}

const get_Order_Done_Data = async () => {
    const get_order = await order_controller.get_Order_Done_Data();

JSON.parse(get_order).forEach(({id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date}) => {
    let ready_render_done_order = new Order(id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date);
    $('#bb').prepend(
        render_done_order(ready_render_done_order),
        );
    });
}

const get_Order_Canceled_Data = async () => {
    const get_order = await order_controller.get_Order_Canceled_Data();

JSON.parse(get_order).forEach(({id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date}) => {
    let ready_render_canceled_order = new Order(id, user_id, book_id, user_first_name, user_second_name, book_price, book_title, book_image, status, count, creation_date);
    $('#cc').prepend(
        render_done_order(ready_render_canceled_order),
        );
    });
}


  
const render_new_order = (order) => { 
    let book_id = order.book_id
    let book_price = order.book_price
    let status = order.status
    let id = order.id
    let book_image = order.book_image
    let book_title = order.book_title
    let count = order.count
    let user_first_name = order.user_first_name
    let user_second_name = order.user_second_name
   
   return `

   <div class="order_container">
   <div class="status_container">
       <span class="status_style"><h4>${status}</h4></span>
   </div>
   <div class="book_container">
       <div class="book_image">
           <img src="/images/${book_image}" width="105" height="160" alt="">
       </div>
       <div class="book_info_container">
           <div class="book_title">
               <span class="book_title"><h3>${book_title}</h3></span>
           </div>
           <div class="book_count">
               <input class="book_amount" type="text" placeholder="${count}">
           </div>
       </div>
       <div class="book_price_container">
           <span class="price_style"><h3>${book_price}</h3></span>
       </div>
   </div>
   <div class="section_article_customer">
       <span class="article_customer_style"><p>Customer</p></span>
       <hr size='1' color='#C4C4C4' width='200'>
   </div>
   <div class="charactres_container">
           <div class="char_row_container">
               <div class="type">
                   <span class="pre_value_row"><p>First Name</p></span>
               </div>
               <div class="type_data">
                   <span class="data_value_row"><p>${user_first_name}</p></span>
               </div>
           </div>
           <div class="char_row_container">
               <div class="author">
                   <span class="pre_value_row"><p>Last Name</p></span>
               </div>
               <div class="author_data">
                   <span class="data_value_row"><p>${user_second_name}</p></span>
               </div>
           </div>
       </div>
       <div class="bottom_line">
           <div class="total_price_container">
               <div class="total_price">
                   <span><p></p></span>
               </div>
           </div>
           <form class="button_container">
               <button class="buy_btn" onclick='cancel_order(this)' data-id=${id} data-status=${status}>
                   <img src="/images/error.svg" width="40" height="40" alt="">
               </button>
               <button type='submit' class="buy_btn" onclick='update_order_to_ongoing(this)' data-id=${id} data-status=${status}>
                   <img src="/images/success.svg" width="40" height="40" alt="">
               </button>
           </form>
       </div>
   </div>
       `
}

const render_ongoing_order = (order) => { 
    let book_id = order.book_id
    let book_price = order.book_price
    let status = order.status
    let id = order.id
    let book_image = order.book_image
    let book_title = order.book_title
    let count = order.count
    let user_first_name = order.user_first_name
    let user_second_name = order.user_second_name
    
    return ` 
    <div class="order_container">
    <div class="status_container">
        <span class="status_style ongoing"><h4>${status}</h4></span>
    </div>
    <div class="book_container">
        <div class="book_image">
            <img src="/images/${book_image}" width="105" height="160" alt="">
        </div>
        <div class="book_info_container">
            <div class="book_title">
                <span class="book_title"><h3>${book_title}</h3></span>
            </div>
            <div class="book_count">
                <input class="book_amount" type="text" placeholder="${count}">
            </div>
        </div>
        <div class="book_price_container">
            <span class="price_style"><h3>${book_price}</h3></span>
        </div>
    </div>
    <div class="section_article_customer">
        <span class="article_customer_style"><p>Customer</p></span>
        <hr size='1' color='#C4C4C4' width='200'>
    </div>
    <div class="charactres_container">
            <div class="char_row_container">
                <div class="type">
                    <span class="pre_value_row"><p>First Name</p></span>
                </div>
                <div class="type_data">
                    <span class="data_value_row"><p>${user_first_name}</p></span>
                </div>
            </div>
            <div class="char_row_container">
                <div class="author">
                    <span class="pre_value_row"><p>Last Name</p></span>
                </div>
                <div class="author_data">
                    <span class="data_value_row"><p>${user_second_name}</p></span>
                </div>
            </div>
        </div>
        <div class="bottom_line">
            <div class="total_price_container">
                <div class="total_price">
                    <span><p></p></span>
                </div>
            </div>
            <form class="button_container">
                <button class="buy_btn" onclick=complete_order(this) data-id=${id} data-status=${status}>
                    <img src="/images/update-arrows.svg" width="30" height="30" alt="">
                </button>
            </form>
        </div>
    </div>
        `
}

const render_done_order = (order) => { 
    let book_id = order.book_id
    let book_price = order.book_price
    let status = order.status
    let id = order.id
    let book_image = order.book_image
    let book_title = order.book_title
    let count = order.count
    let user_first_name = order.user_first_name
    let user_second_name = order.user_second_name
    
    return ` 
    <div class="order_container">
    <div class="status_container">
        <span class="status_style done"><h4>${status}</h4></span>
    </div>
    <div class="book_container">
        <div class="book_image">
            <img src="/images/${book_image}" width="105" height="160" alt="">
        </div>
        <div class="book_info_container">
            <div class="book_title">
                <span class="book_title"><h3>${book_title}</h3></span>
            </div>
            <div class="book_count">
                <input class="book_amount" type="text" placeholder="${count}">
            </div>
        </div>
        <div class="book_price_container">
            <span class="price_style"><h3>${book_price}</h3></span>
        </div>
    </div>
    <div class="section_article_customer">
        <span class="article_customer_style"><p>Customer</p></span>
        <hr size='1' color='#C4C4C4' width='200'>
    </div>
    <div class="charactres_container">
            <div class="char_row_container">
                <div class="type">
                    <span class="pre_value_row"><p>First Name</p></span>
                </div>
                <div class="type_data">
                    <span class="data_value_row"><p>${user_first_name}</p></span>
                </div>
            </div>
            <div class="char_row_container">
                <div class="author">
                    <span class="pre_value_row"><p>Last Name</p></span>
                </div>
                <div class="author_data">
                    <span class="data_value_row"><p>${user_second_name}</p></span>
                </div>
            </div>
        </div>
        <div class="bottom_line">
            <div class="total_price_container">
                <div class="total_price">
                    <span><p></p></span>
                </div>
            </div>
        </div>
    </div>
    `
}

const render_canceled_order = (order) => { 
    let book_id = order.book_id
    let book_price = order.book_price
    let status = order.status
    let id = order.id
    let book_image = order.book_image
    let book_title = order.book_title
    let count = order.count
    let user_first_name = order.user_first_name
    let user_second_name = order.user_second_name
    
    return ` 
    <div class="order_container">
    <div class="status_container">
        <span class="status_style canceled"><h4>${status}</h4></span>
    </div>
    <div class="book_container">
        <div class="book_image">
            <img src="/images/${book_image}" width="105" height="160" alt="">
        </div>
        <div class="book_info_container">
            <div class="book_title">
                <span class="book_title"><h3>${book_title}</h3></span>
            </div>
            <div class="book_count">
                <input class="book_amount" type="text" placeholder="${count}">
            </div>
        </div>
        <div class="book_price_container">
            <span class="price_style"><h3>${book_price}</h3></span>
        </div>
    </div>
    <div class="section_article_customer">
        <span class="article_customer_style"><p>Customer</p></span>
        <hr size='1' color='#C4C4C4' width='200'>
    </div>
    <div class="charactres_container">
            <div class="char_row_container">
                <div class="type">
                    <span class="pre_value_row"><p>First Name</p></span>
                </div>
                <div class="type_data">
                    <span class="data_value_row"><p>${user_first_name}</p></span>
                </div>
            </div>
            <div class="char_row_container">
                <div class="author">
                    <span class="pre_value_row"><p>Last Name</p></span>
                </div>
                <div class="author_data">
                    <span class="data_value_row"><p>${user_second_name}</p></span>
                </div>
            </div>
        </div>
        <div class="bottom_line">
            <div class="total_price_container">
                <div class="total_price">
                    <span><p></p></span>
                </div>
            </div>
        </div>
    </div>
    `
}


update_order_to_ongoing = async (order) => {
    let status = order.dataset.status;
    let id = order.dataset.id;

    const obj = JSON.stringify ({
        status: status,
        id: id
    })
    socket.emit('updateToOngoing', JSON.parse(obj));
    console.log(obj)
    alert('Order number ' + id + ' has been approved')
}

cancel_order = async (order) => {
    let status = order.dataset.status;
    let id = order.dataset.id;

    const obj = JSON.stringify ({
        status: status,
        id: id
    })
    socket.emit('cancelOrder', JSON.parse(obj));
    console.log(obj)
    alert('Order number ' + id + ' has been canceled')
}

complete_order = async (order) => {
    let status = order.dataset.status;
    let id = order.dataset.id;

    const obj = JSON.stringify ({
        status: status,
        id: id
    })
    socket.emit('completeOrder', JSON.parse(obj));
    console.log(obj)
    alert('Order number ' + id + ' has been completed')
}

 
window.addEventListener('DOMContentLoaded', get_Order_New_Data);
window.addEventListener('DOMContentLoaded', get_Order_Ongoing_Data);
window.addEventListener('DOMContentLoaded', get_Order_Done_Data);
window.addEventListener('DOMContentLoaded', get_Order_Canceled_Data);
