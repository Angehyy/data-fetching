function BookCard({ image, title, price, url, onRemove }) {
  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">Buy</a>
      <span className="remove-btn" onClick={onRemove}>x</span> {/* remove button */}
    </div>
  );
}

export default BookCard;
