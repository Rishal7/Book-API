const express = require("express");

// database
const Database = require("./database");

// initialization
const OurAPP = express();

OurAPP.use(express.json());

OurAPP.get("/", (request, response) => {
  response.json({ message: "Server is working!!!!!!" });
});
 


// Route    - /book
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/book", (req, res) => {
  return res.json({ books: Database.Book });
});

// Route    - /book/:bookID
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
OurAPP.get("/book/:bookID", (req, res) => {
  const getBook = Database.Book.filter(
    (book) => book.ISBN === req.params.bookID
  );

  return res.json({ book: getBook });
});

// Route    - /book/c/:category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
OurAPP.get("/book/c/:category", (req, res) => {
  const getBook = Database.Book.filter((book) =>
    book.category.includes(req.params.category)
  );

  return res.json({ book: getBook });
});

// Route    - /book/a/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
OurAPP.get("/book/a/:author", (req, res) => {
  const getBook = Database.Book.filter((book) =>
    book.authors.includes(parseInt(req.params.author))
  );

  return res.json({ book: getBook });
});

// Route    - /book/new
// Des      - to add new book
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
OurAPP.post("/book/new", (req, res) => {
  const { newBook } = (req.body);

  // add new data
  Database.Book.push(newBook);

  return res.json(Database.Book);
});

// Route    - /book/update
// Des      - to update book details
// Access   - Public
// Method   - PUT
// Params   - bookID (ISBN)
// Body     - none
OurAPP.put("/book/update/:bookID", (req, res) => {
  const {updatedBook} = req.body;

  const {bookID} = req.params;

  const book = Database.Book.map((book) => {
    if(book.ISBN === bookID) {
      return { ...book, ...updatedBook}
    }
    return book;
  });

  return res.json(book);
});

// Route    - /book/update
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - bookID (ISBN)
// Body     - none
OurAPP.put("/bookAuthor/update/:bookID", (req, res) => {
  const {newAuthor} = req.body;
  const {bookID} = req.params;

  const book = Database.Book.map((book) => {
    if(book.ISBN = bookID){
      if(!book.authors.includes(newAuthor)) {
        return book.authors.push(newAuthor)
      }
      return book;
    }
    return book;
  });

  const author = Database.Author.map((author) => {
    if(author.id === newAuthor){
      if(!author.books.includes(bookID)){
        return author.books.push(bookID);
      }
      return author;
    }
    return author;
  })
  return res.json({book: book, author: author });
});



// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/author", (req, res) => {
  return res.json({ author: Database.Author });
});

// Route    - /author/:authorID
// Des      - To get a specific author
// Access   - Public
// Method   - GET
// Params   - authorID
// Body     - none
OurAPP.get("/author/:authorID", (req, res) => {
  const getAuthor = Database.Author.filter(
    (author) => author.id === parseInt(req.params.authorID)
  );

  return res.json({ book: getAuthor });
});

// Route    - /author/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
OurAPP.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;

  Database.Author.push(newAuthor);
  
  return res.json(Database.Author);
});

// Route    - /author/update
// Des      - to update author details
// Access   - Public
// Method   - PUT
// Params   - authorID (id)
// Body     - none
OurAPP.put("/author/update/:authorID", (req, res) => {
  const {updatedAuthor} = req.body;

  const {authorID} = req.params;

  const author = Database.Author.map((author) => {
    if(author.id === parseInt(authorID)) {
      return { ...author, ...updatedAuthor}
    }
    return author;
  });

  return res.json(author);
});



// Route    - /publications
// Des      - to get all publicationss
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/publication", (req, res) => {
  return res.json({ publication: Database.Publication });
});

// Route    - /publication/:publicationID
// Des      - To get a specific publication
// Access   - Public
// Method   - GET
// Params   - publicationID
// Body     - none
OurAPP.get("/publication/:publicationID", (req, res) => {
  const getPublication = Database.Publication.filter(
    (publication) => publication.id === parseInt(req.params.publicationID)
  );

  return res.json({ book: getPublication });
});

// Route    - /publication/:bookID
// Des      - To get a publication based on a book
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
OurAPP.get("/publication/b/:bookID", (req, res) => {
  const getPublication = Database.Publication.filter(
    (publication) => publication.books.includes(req.params.bookID)
  );

  return res.json({ book: getPublication });
});

// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
OurAPP.post("/publication/new", (req, res) => {
  const { newPublication } = req.body;

  Database.Publication.push(newPublication);
  
  return res.json(Database.Publication);
});



OurAPP.listen(4000, () => console.log("Server is running"));