const express = require('express');
const bodyParser = require('body-parser');
const Book = require('./model/book');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.get("/books", async(req, res) => {
    const book = await Book.find();
    res.send(book);
});
// Create
router.post("/books", async(req, res) => {
    const book = new Book({
        name: req.body.name,
        qty: req.body.qty
    });
    await book.save();
    res.send("Record Created");
});
// Delete
router.delete('/books/:id', async(req, res) => {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.send("Record Deleted");
    } catch (error) {
        res.status(404).send({ error: "Book Not Found" });
    }
});
// Update
router.patch('/books/:id', async(req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        book.name = req.body.name;
        book.qty = req.body.qty;
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(404).send(error);
    }
});
module.exports = router;