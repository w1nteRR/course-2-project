const socket = io.connect('http://localhost:3000');

const title = document.getElementById('title_input');
const author = document.getElementById('author_input');
const publisher = document.getElementById('publisher_input')
const price = document.getElementById('price_input');
const type = document.getElementById('type_input');
const description = document.getElementById('description_input');
const review = document.getElementById('review_input');
const image = document.getElementById('book_image')



function readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
  
      reader.onload = function(e) {
        $('#book_photo').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  };
  
  $("#fileField").change(function() {
    readURL(this);
  });

   createBook = () => {
    let filenameIn = $('input[type=file]').val();
    const filenameOut = filenameIn.split('\\').pop();

    const obj = JSON.stringify ({
        title: title.value,
        author: author.value,
        publisher: publisher.value,
        price: price.value,
        type: type.value,
        description: description.value,
        review: review.value,
        image: filenameOut
    })
    socket.emit('createBook', JSON.parse(obj));
    console.log(obj)

}