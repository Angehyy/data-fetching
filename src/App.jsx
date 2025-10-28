import { useState, useEffect } from "react";
import data from "../data/books.json";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {
  // Initialize books from localStorage or fallback to JSON data
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks
      ? JSON.parse(storedBooks)
      : data.map(book => ({ ...book, selected: false }));
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [filter, setFilter] = useState("All");

  // Persist books in localStorage
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Toggle selection (only one book at a time)
  const handleSelectBook = (isbn) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.isbn13 === isbn
          ? { ...book, selected: !book.selected }
          : { ...book, selected: false }
      )
    );
  };

  // Delete selected book
  const handleDelete = () => {
    setBooks(prevBooks => prevBooks.filter(book => !book.selected));
  };

  // Open modal for editing
  const handleUpdate = () => {
    const selectedBook = books.find(book => book.selected);
    if (!selectedBook) {
      alert("Please select a book to edit.");
      return;
    }
    setEditingBook(selectedBook);
    setIsModalOpen(true);
  };

  // Open modal for adding
  const openModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Handle Add/Edit submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formBook = {
      title: form.title.value,
      author: form.author.value,
      image: form.url.value,
      isbn13: editingBook ? editingBook.isbn13 : Date.now().toString(),
      price: form.price.value || "$0",
      selected: false,
    };

    setBooks(prevBooks =>
      editingBook
        ? prevBooks.map(book =>
            book.isbn13 === editingBook.isbn13 ? formBook : book
          )
        : [...prevBooks, formBook]
    );

    closeModal();
    form.reset();
    setEditingBook(null);
  };

  // Filter logic based on price
  const filterBooks = (books) => {
    if (filter === "All") return books;
    return books.filter(book => {
      const priceValue = parseFloat(book.price.replace("$", "")) || 0;
      if (filter === "low") return priceValue <= 10;
      if (filter === "mid") return priceValue > 10 && priceValue <= 20;
      if (filter === "high") return priceValue > 20;
      return true;
    });
  };

  const filteredBooks = filterBooks(books);

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Catalog</h1>
      </header>

      <main className="main-content">
        {/* Filter Section */}
        <div className="filter-section">
          <label htmlFor="priceFilter">Filter by Price:</label>
          <select
            id="priceFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="low">$0 - $10</option>
            <option value="mid">$10 - $20</option>
            <option value="high">$20+</option>
          </select>
        </div>

        {/* Book Grid */}
        <div className="grid-area">
          {filteredBooks.map((book) => (
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
        <p>© 2025 My Book Catalog — ❤️ Angel</p>
      </footer>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  defaultValue={editingBook?.title || ""}
                  required
                />
              </label>
              <label>
                Author:
                <input
                  type="text"
                  name="author"
                  defaultValue={editingBook?.author || ""}
                  required
                />
              </label>
              <label>
                URL (cover image):
                <input
                  type="text"
                  name="url"
                  defaultValue={editingBook?.image || ""}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  defaultValue={editingBook?.price || ""}
                />
              </label>
              <div className="modal-actions">
                <button type="submit">
                  {editingBook ? "Save Changes" : "Submit"}
                </button>
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
