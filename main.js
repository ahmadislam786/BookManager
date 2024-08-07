class Book{
    constructor(title,author,isbn){
      this.title=title;
      this.author=author;
      this.isbn=isbn
    }
  }
  class UI{
    static displayBooks(){
    //   const StoreBooks=[
    //     {
    //       title:'Book One',
    //       author:'John Doe',
    //       isbn:123
    //     },
    //     {
    //       title:'Book two',
    //       author:'John Doe',
    //       isbn:1234
    //     }
    //   ]
    const books=Store.getBooks();
    books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
      const list=document.querySelector('#book-list')
      const row=document.createElement('tr')
      row.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
    }
    static deleteBook(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove()
      }
    }
    static showAlert(message,className){
      const div=document.createElement('div')
      div.className=`alert alert-${className}`;
      div.appendChild(document.createTextNode(message)); 
      const conatiner=document.querySelector('.container');
      const form=document.querySelector('.book-form');
      conatiner.insertBefore(div,form)
      setTimeout(()=>document.querySelector('.alert').remove(),2000)
    }
    static clearAllFiels(){
      document.querySelector('#title').value='';
      document.querySelector('#author').value='';
      document.querySelector('#isbn').value='';
    }
  }
  
    // Store Class: Handles Storage
    class Store {
      static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
      }
    
      static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
    
      static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach((book, index) => {
          if(book.isbn === isbn) {
            books.splice(index, 1);
          }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
    }
  
  document.addEventListener('DOMContentLoaded',UI.displayBooks);
  
  document.querySelector('.book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value
    const author=document.querySelector('#author').value
    const isbn=document.querySelector('#isbn').value
    if(title===''||author===''||isbn===''){
      UI.showAlert('Please fill in all fields','danger')
    }else{
      const books=new Book(title,author,isbn);
      UI.addBookToList(books);
      Store.addBook(books)
      UI.showAlert("Book added successfully",'success')
      UI.clearAllFiels(); 
    }
  })
  
  document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Delete Book successfully','info')
  })