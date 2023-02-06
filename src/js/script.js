{
  ('use strict');

  const bookTemplete = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    
  const select = {
    booksList: '.books-list',
    bookImage: '.book__image',
    dataId: 'data-id'
  };

  const listBooksElem = document.querySelector(select.booksList);

  let favoriteBooks = [];
  
  function render() {

    for (let book of dataSource.books) {
 
      const generatedHTML = bookTemplete({
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image
      });
        
      const bookElem = utils.createDOMFromHTML(generatedHTML);

      listBooksElem.appendChild(bookElem);

    }
  
  }

  function initActions() {

    const booksImages = listBooksElem.querySelectorAll(select.bookImage);

    for (let bookImg of booksImages) {
      
      bookImg.addEventListener('dblclick', function(e) {
        e.preventDefault();
        const bookImgId = bookImg.getAttribute(select.dataId);

        if(!favoriteBooks.includes(bookImgId)) {
          favoriteBooks.push(bookImgId);
          bookImg.classList.add('favorite');
        } else {
          const indexOfImg = favoriteBooks.indexOf(bookImg);
          favoriteBooks.splice(indexOfImg, 1);
          bookImg.classList.remove('favorite');
        }
      })
    }


  }

  render();
  initActions();

}  
   