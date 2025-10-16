import { useState } from "react";
import data from "../data/books.json";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {
  const [books, setBooks] = useState(
    data.map(book => ({ ...book, selected: false }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle selection: only one book can be selected at a time
  const handleSelectBook = (isbn) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn13 === isbn
          ? { ...book, selected: !book.selected }
          : { ...book, selected: false }
      )
    );
  };

  // Delete selected book
  const handleDelete = () => {
    setBooks((prevBooks) => prevBooks.filter((book) => !book.selected));
  };

  // Update = no-op for now
  const handleUpdate = () => {
    alert("Update functionality coming soon!");
  };

  // Modal controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add a new book
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newBook = {
      title: form.title.value,
      author: form.author.value,
      image: form.url.value,
      isbn13: Date.now().toString(),
      selected: false,
      price: form.price?.value || "$0"
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
    closeModal();
    form.reset();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Catalog</h1>
      </header>

      <main className="main-content">
        <div className="grid-area">
          {books.map((book) => (
            <BookCard
              key={book.isbn13}
              book={book}
              onSelect={() => handleSelectBook(book.isbn13)}
            />
          ))}

          {/* Add card */}
          <div className="add-card">
            <button className="add-btn" onClick={openModal}>+</button>
            <div className="action-buttons-vertical">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 My Book Catalog —  ❤️ Angel</p>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Book</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input type="text" name="title" required />
              </label>
              <label>
                Author:
                <input type="text" name="author" required />
              </label>
              <label>
                URL (cover image):
                <input type="text" name="url" required />
              </label>
              <label>
                Price:
                <input type="text" name="price" />
              </label>
              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
