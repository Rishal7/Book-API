const Router = require('express').Router();

const BookModel = require('../schema/book');
const AuthorModel = require('../schema/author');

// Route    - /book
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/book", async(req, res) => {
   const getAllBooks = await BookModel.find();
   return res.json({book: getAllBooks});
 });
 
 // Route    - /book/:bookID
 // Des      - To get a book based on ISBN
 // Access   - Public
 // Method   - GET
 // Params   - bookID
 // Body     - none
 Router.get("/book/:bookID", async(req, res) => {
   const getSpecificBook = await BookModel.findOne({ 
      ISBN: req.params.bookID 
   });
 
   if(!getSpecificBook){
     return res.json({
       error: `No book found for the ISBN of ${req.params.bookID}`,
     });
   }
 
   return res.json(getSpecificBook);
 });
 
 // Route    - /book/c/:category
 // Des      - to get a list of books based on category
 // Access   - Public
 // Method   - GET
 // Params   - category
 // Body     - none
 Router.get("/book/c/:category", async(req, res) => {
   const getBook = await BookModel.find({
     category: req.params.category,
   });
 
   if(!getBook){
     return res.json({error: `No book found for the category of ${req.params.category}`});
   }
 
   return res.json({books: getBook});
 });
 
 //TODO
 // Route    - /book/a/:author
 // Des      - to get a list of books based on author
 // Access   - Public
 // Method   - GET
 // Params   - author
 // Body     - none
 Router.get("/book/a/:author", (req, res) => {
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
 Router.post("/book/new", async(req, res) => {
   try {
     const { newBook } = req.body;

     await BookModel.create(newBook);
     return res.json({ message: "Book added to the Database" });
 
   } catch (error) {
     return res.json({ error: error.message });
   }
 });
 
 // Route    - /book/updateTitle
 // Des      - to update title of a book 
 // Access   - Public
 // Method   - PUT
 // Params   - bookID (ISBN)
 // Body     - none
 Router.put("/book/updateTitle/:bookID", async(req, res) => {
 const { title } = req.body.title;
 
   const updateBook = await BookModel.findOneAndUpdate(
     {
       ISBN: req.params.bookID,
     },
     {
       title: title,
     },
     {
       new: true,
     }
   )
   
   return res.json({book: updateBook});
 });
 
 // Route    - /book/updateAuthor/:bookID
 // Des      - to update/add new author
 // Access   - Public
 // Method   - PUT
 // Params   - bookID (ISBN)
 // Body     - none
 Router.put("/book/updateAuthor/:bookID", async(req, res) => {
   const { newAuthor}  = req.body;
   const { bookID } = req.params;
 
   const updatedBook = await BookModel.findOneAndUpdate(
     {
       ISBN: bookID,
     },
     {
       $addToSet: {
         authors: newAuthor,
       },
     },
     {
       new: true,
     }
   );
 
   const updatedAuthor = await AuthorModel.findOneAndUpdate(
     {
       id: newAuthor,
     },
     {
       $addToSet: {
         books: bookID,
       },
     },
     {
       new: true,
     }
   );
 
   return res.json({ 
     books: updatedBook, 
     authors: updatedAuthor,
     message: "New author added to the book",   
   });
 });
 
 // Route    - /book/delete/:bookID
 // Des      - to delete a book
 // Access   - Public
 // Method   - DELETE
 // Params   - bookID (ISBN)
 // Body     - none
 Router.delete("/book/delete/:bookID", async(req, res) => {
   const { bookID } = req.params;
 
   const updateBookDatabase = await BookModel.findOneAndDelete({
     ISBN: bookID,
   });
 
   return res.json({books: updateBookDatabase});
 });
 
 // Route    - /book/delete/author
 // Des      - to delete an author from a book
 // Access   - Public
 // Method   - DELETE
 // Params   - AuthorID, bookID (ISBN)
 // Body     - none
 Router.delete("/book/delete.author/:bookID/:authorID", async(req, res) => {
   const {bookID, authorID} = req.params;
 
   //updating book database object
   const updatedBook = await BookModel.findByIdAndUpdate({
       ISBN: bookID,
     },
     {
       $pull: {
         authors: parseInt(id),
       }
     },
     {
       new: true,
     }
   );
 
   const updatedAuthor = await AuthorModel.findOneAndUpdate(
     {
       id: parseInt(authorID),
     },
     {
       $pull: {
         books: bookID,
       },
     },
     {
       new: true,
     }
   );
 
   return res.json({
     message: "Author is deleted", 
     book: updatedBook,
     author: updatedAuthor
   });
 });

 module.exports = Router;