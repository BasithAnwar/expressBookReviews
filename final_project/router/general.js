const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn=req.params.isbn;
    let book=books[isbn];
    if(book){
        res.send(JSON.stringify(book));
    }else{
        return res.status(403).json({message: "ISBN invalid"});
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author=req.params.author;
    let bookbyAuth=Object.values(books).filter(book=>book.author===author);
    if(bookbyAuth.length>0){
        res.send(JSON.stringify(bookbyAuth));
    }else{
        return res.status(403).json({message: "no book written by "+author});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title=req.params.title;
    let bookByTitle=Object.values(books).filter(book=>book.title===title);
    if(bookByTitle.length>0){
        res.send(JSON.stringify(bookByTitle));
    }else{
        return res.status(403).json({message: "no book with title "+title});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn=req.params.isbn;
    let book=books[isbn];
    if(book){
        res.send(JSON.stringify(book.reviews));
    }else{
        return res.status(403).json({message: "no book with isbn "+isbn});
    }
});

module.exports.general = public_users;
