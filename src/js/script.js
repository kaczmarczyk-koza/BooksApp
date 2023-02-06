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
        image: book.image,
        ratingWidth: book.rating * 10,
        ratingBgc: determineRatingBgc(book.rating)

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

  function determineRatingBgc(rating) {
    let background = '';

    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }else if (rating > 8 && rating <= 9) {
      background ='linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

  render();
  initActions();
}  
   