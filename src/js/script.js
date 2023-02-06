{
  ('use strict');

  const bookTemplete = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    
  const select = {
    booksList: '.books-list',
  };
  
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

      const listBooksElem = document.querySelector(select.booksList);

      listBooksElem.appendChild(bookElem);

    }
  
  }

  render();

}  
   