import { useState } from "react";
import data from "../data/books.json";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {
  const [books, setBooks] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- modal state

  const removeBook = (isbn) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn13 !== isbn));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    closeModal();
    // For now, we’re not doing anything with the data
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Catalog</h1>
      </header>

      <main className="main-content">
        <div className="grid-area">
          {books.map((book) => (
            <BookCard
              key={book.isbn13}
              image={book.image}
              title={book.title}
              price={book.price}
              url={book.url}
              onRemove={() => removeBook(book.isbn13)}
            />
          ))}
        </div>

        <div className="add-area">
          <button className="add-btn" onClick={openModal}>+</button>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 My Book Catalog</p>
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
                Publisher:
                <input type="text" name="publisher" required />
              </label>
              <label>
                Publication Year:
                <input type="number" name="year" required />
              </label>
              <label>
                Language:
                <input type="text" name="language" required />
              </label>
              <label>
                Pages:
                <input type="number" name="pages" required />
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
