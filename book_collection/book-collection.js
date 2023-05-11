const express = require('express');
const app = express();
app.use(express.json());

// Initialize empty book collection
let books = [];

// Serve static HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a book to the collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  // Generate a unique ID
  const id = generateUniqueId();

  // Create book object
  const book = {
    id,
    title,
    author,
    publishedDate
  };

  // Add book to collection
  books.push(book);

  // Return the book object in the response
  res.json(book);
});

// Delete a book from the collection
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the book with the specified ID
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    // Remove the book from the collection
    const deletedBook = books.splice(index, 1)[0];
    res.json({ message: 'Book successfully deleted.' });
  } else {
    res.json({ message: 'Book not found.' });
  }
});

// Helper function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15);
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
