/*
Requirements

Book
 - ISBN           - String
 - Title          - String
 - Author         - [Number]
 - Language       - String
 - NumOfpages     - Number
 - Categories     - [String]

Author
 - ID             - Number
 - Name           - String
 - Books          - [String]

Publications
 - ID             - Number
 - Name           - String
 - Books          - [String]

--- APIs ---

Book
 -GET
   - to get all books
   - to get specific books
   - to get a list of books based on category
   - to get a list of books based on author

 - POST
   - to add new book

 - PUT
   - to update book details
   - to update/add new author

 -DELETE
   - delete a book
   - delete an author from the book


Authors
 -GET
   - to get all authors
   - to get specific authors
   - to get a list of author based on book

 - POST
   - to add new author
   - to update/add new book

 - PUT
   - to update author details

 -DELETE
   - delete an author

   
Publications
-GET
   - to get all publication
   - to get specific publication
   - to get a list of publication based on book

 - POST
   - to add new publication

 - PUT
   - to update publication details
   - to update/add new book

 -DELETE
   - delete a book from publication
   - delete a publication




*/