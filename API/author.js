const Router = require('express').Router();

const AuthorModel = require('../schema/author');

// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/author", async(req, res) => {
   const getAllAuthors = await AuthorModel.find();
   return res.json(getAllAuthors);
 });
 
 //TODO
 // Route    - /author/:authorID
 // Des      - To get a specific author
 // Access   - Public
 // Method   - GET
 // Params   - authorID
 // Body     - none
 Router.get("/author/:authorID", (req, res) => {
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
 Router.post("/author/new", async(req, res) => {
   const { newAuthor } = req.body;
 
   await AuthorModel.create(newAuthor);
 
   return res.json({message: "Author added to the database"});
 });
 
 //TODO
 // Route    - /author/updateName
 // Des      - to update author name
 // Access   - Public
 // Method   - PUT
 // Params   - authorID (id)
 // Body     - none
 Router.put("/author/updateName/:authorID", (req, res) => {
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
 
 //TODO
 // Route    - /author/delete/:authorID
 // Des      - to delete an author
 // Access   - Public                                                             
 // Method   - DELETE
 // Params   - authorID
 // Body     - none
 Router.delete("/author/delete/:authorID", async(req, res) => {
   const {authorID} = req.params;
 
   const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(authorID));
   
   Database.Author = filteredAuthors;
 
   return res.json(Database.Author);
 });

 module.exports = Router;