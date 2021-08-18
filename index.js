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
  console.log(req.body);
  return res.json({message: 'Book added successfully'});
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

  console.log(newAuthor);
  
  return res.json({message: 'Author added successfully'});
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
  const newPublication = req.body;

  console.log(newPublication);
  
  return res.json({message: 'Publication added successfully'});
});



OurAPP.listen(4000, () => console.log("Server is running"));