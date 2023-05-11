const express = require('express');
const app = express();

const PORT = 3000;
app.use(express.static('public'));

app.use(express.json())

// Define books array
let books = [];

// GET /books route
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books route
app.post('/books', (req, res) => {

    // Get value from req.body and assign the value by destructuring
    const { title, author, publishedDate } = req.body;

    // Generate unique ID
    const id = Math.floor(Math.random() * 1000);

    // Add book to collection
    const book = { id, title, author, publishedDate };
    books.push(book);

    // Send response
    res.status(201).json(book);
});

// DELETE /books/:id route
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Find book by ID using findIndex()
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        // Book not found in an id
        res.status(404).json({ message: 'Book not found' });
    } else {
        // Remove book from collection an id
        books.splice(index, 1);

        // Send response
        res.json({ message: 'Book deleted successfully' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is Running http://localhost:${PORT}`);
})