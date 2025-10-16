import React from "react";
import "./BookCard.css";

function BookCard({ book, onSelect }) {
  return (
    <div
      className={`book-card ${book.selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p className="price">{book.price}</p>
    </div>
  );
}

export default BookCard;
