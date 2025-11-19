import { useEffect, useState } from "react";
import "./BookDetails.css";

function BookDetails({ book, onClose }) {
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSimilar = async () => {
      setLoading(true);
      try {
        // Search by title first
        let res = await fetch(`https://api.itbook.store/1.0/search/${encodeURIComponent(book.title)}`);
        let data = await res.json();

        // Fallback: search by author if no results
        if (!data.books || data.books.length === 0) {
          res = await fetch(`https://api.itbook.store/1.0/search/${encodeURIComponent(book.author)}`);
          data = await res.json();
        }

        if (data.books) {
          // Exclude the current book
          const filteredBooks = data.books.filter(b => b.isbn13 !== book.isbn13);
          setSimilarBooks(filteredBooks.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching similar books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [book]);

  return (
    <div className="book-details">
      <button className="close-btn" onClick={onClose}>← Back</button>
      <div className="details-header">
        <img src={book.image} alt={book.title} />
        <div className="details-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Publisher:</strong> {book.publisher || "N/A"}</p>
          <p><strong>Year:</strong> {book.year || "N/A"}</p>
          <p><strong>Pages:</strong> {book.pages || "N/A"}</p>
          <p><strong>Price:</strong> {book.price}</p>
        </div>
      </div>

      <h3>Similar Books</h3>
      {loading ? (
        <p>Loading similar books...</p>
      ) : similarBooks.length > 0 ? (
        <div className="similar-grid">
          {similarBooks.map(sim => (
            <div key={sim.isbn13} className="similar-card">
              <img src={sim.image} alt={sim.title} />
              <p>{sim.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No similar books found.</p>
      )}
    </div>
  );
}

export default BookDetails;
