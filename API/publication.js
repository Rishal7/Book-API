const Router = require('express').Router();

const PublicationModel = require('../schema/publication');

// Route    - /publications
// Des      - to get all publicationss
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/publication", (req, res) => {
   return res.json({ publication: Database.Publication });
 });
 
 // Route    - /publication/:pubID
 // Des      - To get a specific publication
 // Access   - Public
 // Method   - GET
 // Params   - pubID
 // Body     - none
 Router.get("/publication/:pubID", (req, res) => {
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
 Router.get("/publication/b/:bookID", (req, res) => {
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
 Router.post("/publication/new", (req, res) => {
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
 Router.put("/publication/update/:pubID", (req, res) => {
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
 
 ///todo task
 // Route    - /publication/delete/:pubID
 // Des      - to delete an publication
 // Access   - Public
 // Method   - DELETE
 // Params   - pubID
 // Body     - none
 Router.delete("/publication/delete/:pubID", (req, res) => {
   const {pubID} = req.params;
 
   const filteredPublication = Database.Publication.filter((pub) => pub.id !== parseInt(pubID));
 
   Database.Publication = filteredPublication;
 
   return res.json(Database.Publication);
 });
 
 //todo task
 // Route    - /publication/delete/book
 // Des      - to delete a book from publication
 // Access   - Public
 // Method   - DELETE
 // Params   - bookID (ISBN), pubID
 // Body     - none
 Router.delete("/publication/delete/book/:bookID/:pubID", (req, res) => {
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

module.exports = Router;