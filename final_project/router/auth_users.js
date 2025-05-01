const express = require('express');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }}

  
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}
// Add a book review 
regd_users.put("/auth/review/:isbn", async (req, res) => {
  let isbn = parseInt(req.params.isbn) ;
  let username = req.session.authorization['username'] ;
  let review = req.query.review ;
  let book = books[isbn] ;
  let exist =await book.reviews.find((review) => {
    return (
      review.username === username
    )
  })
  if(!book)
    return res.status(404).json({error : 'there is no book with this isbn : '+isbn}) ;
  if(exist){
    await book.reviews.map((review) => {
      if(review.username == username){
        review.review = review
      }
    })
    res.status(200).json({message:"Modified review"})
  }
  else {
    await book.reviews.push({username,review}) ;
    return res.status(200).json({message: "Added review successfully"});
  }
});
regd_users.delete("/auth/review/:isbn",async (req,res)=> {
  let isbn = parseInt(req.params.isbn) ;
  let username = req.session.authorization['username'] ;
  books[isbn].reviews = await [...books[isbn].reviews.filter(review => review.username !== username)]
  return res.status(200).json({message : "Deleted review successfully"})
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;