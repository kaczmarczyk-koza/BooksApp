{
  ('use strict');

  const bookTemplete = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    
  const select = {
    booksList: '.books-list',
    bookImage: '.book__image',
    dataId: 'data-id',
    filters: '.filters'
  };
  const settings = {
    hidden: 'hidden'
  };

  const listBooksElem = document.querySelector(select.booksList);

  let favoriteBooks = [];

  let filters = [];
  
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

    listBooksElem.addEventListener('dblclick', function(e) {
      e.preventDefault();

      const bookImg = e.target.offsetParent;
      const bookImgId = bookImg.getAttribute(select.dataId);

      if(!favoriteBooks.includes(bookImgId)) {
        favoriteBooks.push(bookImgId);
        bookImg.classList.add('favorite');
      } else {
        const indexOfImg = favoriteBooks.indexOf(bookImg);
        favoriteBooks.splice(indexOfImg, 1);
        bookImg.classList.remove('favorite');
      }
    });

    const filterBook = document.querySelector(select.filters);

    filterBook.addEventListener('click', function(cb) {
      const element = cb.target;
      
      if(element.tagName == 'INPUT' && element.type == 'checkbox' && element.name == 'filter'){
        if(element.checked){
          filters.push(element.value)
          console.log(element.value);
        } else {
          const indexOfFilter = filters.indexOf(element.value);
          filters.splice(indexOfFilter, 1);
        }
      }
      filterBooks();
    });
   
  }

  function filterBooks() {
    
    for(let book of dataSource.books) {
      let shouldBeHidden = false;
      const image = document.querySelector(select.bookImage + '[data-id="' + book.id + '"]');

      for(let filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      
      if(shouldBeHidden) {
        image.classList.add(settings.hidden);
       } else {
        image.classList.remove(settings.hidden);
      }
    }
  }

  render();
  initActions();

}  
   