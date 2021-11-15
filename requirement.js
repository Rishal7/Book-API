/*
Requirements
Book
 - ISBN             - String
 - Title            - String
 - Author           - [Number]
 - Language         - String
 - Publications     - Number
 - NumOfPages       - Number
 - Categories       - [String]
Author
 - id               - Number
 - name             - String
 - books            - [Sting]
Publications
 - id               - Number
 - name             - String
 - books            - [Sting]
---- APIs ------
Book
 - GET
    - to get all books ✅🔴
    - to get specific books ✅🔴
    - to get a list of books based on category ✅🔴
    - to get a list of books based on author -> [Task] 🔥✅
 - POST
    - to add new book✅🔴
 - PUT
    - to update book details✅🔴
    - to update/add new author✅🔴
 - DELETE
    - delete a book✅🔴
    - delete an author from the book✅🔴
Authors
 - GET
    - to get all authors ✅🔴
    - to get specific author -> [Task] 🔥✅❓
    - to get list of author based on a book //TODO BY SIR
 - POST
    - to add new author✅🔴
    - to update/add new book //TODO BY SIR
 - PUT
    - update author details✅❓
 - DELETE
    - delete an author✅❓
Publication
 - GET
    - to get all publication -> [Task] 🔥✅
    - to get specific publication -> [Task] 🔥✅
    - to get a list of publication based on a book. -> [Task] 🔥✅
 - POST
    - Add new publication✅
 - PUT
    - update publication✅ 
    - to update/add new book
 - DELETE
    - delete a book from publication✅ 
    - delete a publication✅
*/