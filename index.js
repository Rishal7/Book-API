const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();

// database
const Database = require("./database");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
.then(() => console.log('connection established!'))
.catch((err) => {
  console.log(err);
});

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

// Route    - /book/updateTitle
// Des      - to update title of a book 
// Access   - Public
// Method   - PUT
// Params   - bookID (ISBN)
// Body     - none
OurAPP.put("/book/updateTitle/:bookID", (req, res) => {
  const {updatedBook} = req.body;
  const {bookID} = req.params;

  Database.Book.forEach((book) => {
    if(book.ISBN === bookID) {
      book.title = updatedBook.title;
      return book;
    }
    return book;
  });

  return res.json(Database.Book);
});

// Route    - /book/updateAuthor/:bookID
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - bookID (ISBN)
// Body     - none
OurAPP.put("/book/updateAuthor/:bookID", (req, res) => {
  const {newAuthor} = req.body;
  const {bookID} = req.params;

    // updating book database object
    Database.Book.forEach((book) => {
      if (book.ISBN === bookID) {
          // check if author already exist
          if (!book.authors.includes(newAuthor)) {
              // if not, then push new author
              book.authors.push(newAuthor);
              return book;
          }
          return book;
      }
      return book;
  });

  // updating author Database object
  Database.Author.forEach((author) => {
      if (author.id === newAuthor) {
          // check if book already exist
          if (!author.books.includes(bookID)) {
              // if not, then push new book
              author.books.push(bookID);
              return author;
          }
          return author;
      }
      return author;
  });

  return res.json({ book: Database.Book, author: Database.Author });
});

// Route    - /book/delete/:bookID
// Des      - to delete a book
// Access   - Public
// Method   - DELETE
// Params   - bookID (ISBN)
// Body     - none
OurAPP.delete("/book/delete/:bookID", (req, res) => {
  const {bookID} = req.params;

  const filteredBooks = Database.Book.filter((book) => book.ISBN !== bookID);
  
  Database.Book = filteredBooks;

  return res.json(Database.Book);
});

// Route    - /book/delete/author
// Des      - to delete an author from a book
// Access   - Public
// Method   - DELETE
// Params   - AuthorID, bookID (ISBN)
// Body     - none
OurAPP.delete("/book/delete.author/:bookID/:authorID", (req, res) => {
  const {bookID, authorID} = req.params;

  //updating book database object
  Database.Book.forEach((book) => {
    if(book.ISBN === bookID) {
      if(!book.authors.includes(parseInt(authorID))) {
        res.status(400).json({message: "Author not found"});
        return ;
      }

      book.authors = book.authors.filter(
        (id) => id !== parseInt(authorID)
      );
      return book;
    }
    return book;
  });

  Database.Author.forEach((author) => {
    if(author.id === parseInt(authorID)){
      if(!author.books.includes(bookID)) {
        return ;
      }

      author.books = author.books.filter((book) => book !== bookID);
      return author;
    }
    return author;
  });

  return res.json({book: Database.Book, author: Database.Author})
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

// Route    - /author/updateName
// Des      - to update author name
// Access   - Public
// Method   - PUT
// Params   - authorID (id)
// Body     - none
OurAPP.put("/author/updateName/:authorID", (req, res) => {
  const {updatedAuthor} = req.body;

  const {authorID} = req.params;

  Database.Author.forEach((author) => {
    if(author.id === parseInt(authorID)) {
      author.name = updatedAuthor.name;
      return author;
    }
    return author;
  });

  return res.json(Database.Author);
});

// Route    - /author/delete/:authorID
// Des      - to delete an author
// Access   - Public
// Method   - DELETE
// Params   - authorID
// Body     - none
OurAPP.delete("/author/delete/:authorID", (req, res) => {
  const {authorID} = req.params;

  const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(authorID));
  
  Database.Author = filteredAuthors;

  return res.json(Database.Author);
})



// Route    - /publications
// Des      - to get all publicationss
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/publication", (req, res) => {
  return res.json({ publication: Database.Publication });
});

// Route    - /publication/:pubID
// Des      - To get a specific publication
// Access   - Public
// Method   - GET
// Params   - pubID
// Body     - none
OurAPP.get("/publication/:pubID", (req, res) => {
  const getPublication = Database.Publication.filter(
    (publication) => publication.id === parseInt(req.params.pubID)
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

// Route    - /publication/update
// Des      - to update publication details
// Access   - Public
// Method   - PUT
// Params   - pubID (id)
// Body     - none
OurAPP.put("/publication/update/:pubID", (req, res) => {
  const {updatedPublication} = req.body;

  const {pubID} = req.params;

  const publication = Database.Publication.map((publication) => {
    if(publication.id === parseInt(pubID)) {
      return { ...publication, ...updatedPublication}
    }
    return publication;
  });

  return res.json(publication);
});

// Route    - /publication/delete/:pubID
// Des      - to delete an publication
// Access   - Public
// Method   - DELETE
// Params   - pubID
// Body     - none
OurAPP.delete("/publication/delete/:pubID", (req, res) => {
  const {pubID} = req.params;

  const filteredPublication = Database.Publication.filter((pub) => pub.id !== parseInt(pubID));

  Database.Publication = filteredPublication;

  return res.json(Database.Publication);
});

// Route    - /publication/delete/book
// Des      - to delete a book from publication
// Access   - Public
// Method   - DELETE
// Params   - bookID (ISBN), pubID
// Body     - none
OurAPP.delete("/publication/delete/book/:bookID/:pubID", (req, res) => {
  const {bookID, pubID} = req.params;

  Database.Book.forEach((book) => {
    if(book.ISBN === bookID){
      book.publication = 0;
      return book;
    }
    return book;
  });

  Database.Publication.forEach((pub) => {
    if(pub.id === parseInt(pubID)){
      const filteredBooks = pub.books.filter(
        (book) => book !== bookID
      );
      pub.books = filteredBooks;
      return pub;
    }
    return pub;
  });

  return res.json({book: Database.Book, publication :Database.Publication})
});


OurAPP.listen(4000, () => console.log("Server is running"));