import React from "react";
import "./BookCard.css";

function BookCard({ book, onSelect, onViewDetails }) {
  return (
    <div
      className={`book-card ${book.selected ? "selected" : ""} ${book.onLoan ? "on-loan" : ""}`}
      onClick={onSelect}
    >
      <div className="image-wrapper">
        <img src={book.image} alt={book.title} />
        {book.onLoan && <span className="loan-badge">On Loan</span>}
      </div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p className="price">{book.price}</p>
      <button
        className="details-btn"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
      >
        View Details
      </button>
    </div>
  );
}

export default BookCard;
