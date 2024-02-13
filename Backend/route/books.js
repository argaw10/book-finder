const router = require('express').Router()
const books = require('../models/books');

//  GET/books        ==> to fetching all books.
router.get('/books', async (req,res) => {
    try {
        const allBooks = await books.find({});
        res.status(200).json(allBooks);
    } catch (err) {
        res.status(500).json(err)
    }
});



//  POST/books       ==> to add a new book
router.post('/books', async (req,res) => {
  const newUser = new books ({
    authors: req.body.authors,
    title: req.body.title,
    publisher: req.body.publisher,    
    publishYear: req.body.publishYear,
    favourite: req.body.favourite,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser)
  } catch(err) {
    res.status(500).json(err);
  }
})

//  GET/books/{id}   ==> to get details of specfic book

router.get('/books/:id', async (req,res) => {
    try { 
        const book = await books.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
          }
          res.status(200).json(book);
        } catch (err) {
          res.status(500).json(err);
        }
});

//  PUT/books/{id}   ==> to update a specfic product
router.put('/books/:id', async(req,res) => {
    const query = {_id: req.params.id};
    try {
        const  updateBook = await books.findOneAndUpdate(
        query,
        { $set: req.body },
        { new: true } 
        )
        res.status(200).json(updateBook);
    } catch (err) {
        res.status(500).json(err);
      }
})
// DELETE/books/{id} ==> to delete a specfic book
router.delete('/books/:id', async (req,res) => {
    try {
        await books.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
      }
})


module.exports = router;