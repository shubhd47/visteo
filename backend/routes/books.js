const express = require("express");
const app = express();
const router = express.Router();
const Books = require('../models/books');

router.post("/create",(req, res)=>{
    const book = new Books({
        name: req.body.name,
        author: req.body.author,
        isbn: req.body.isbn,
      });
      book
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Book Added!",
            result: result,
          });
        })
        .catch((error) => {
            console.log('error-',error)
          res.status(401).json({
            message: "Error Occured",
            error: error,
          });
        });
})

router.get("/",async(req,res)=>{
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    let title = req.query.title;
    let query={};
    if (!page || page < 0 || page === 0) {
        page = 1
    }
    if (!size || size < 0 || size === 0) {
        size = 5
    }
    if(title){
      query.name=title;
    }
    const totalCount = await Books.countDocuments();
    Books.find(query).skip(size * (page - 1)).limit(size)
    .then((result) => {
      res.status(200).json({
        message: "Books fetched successfully",
        result: result,
        totalCount:totalCount
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error Occured",
        error: error,
      });
    });
})

module.exports = router;
