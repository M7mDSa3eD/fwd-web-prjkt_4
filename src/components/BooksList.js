import { Component } from "react";
import { Link } from "react-router-dom";
import BooksShelf from "./BooksShelf.js";

class BooksList extends Component {
  render() {
    const { books, changeShelf } = this.props;
    const booksTypes = [
      { type: "currentlyReading", title: "Currently Reading" },
      { type: "wantToRead", title: "Want to Read" },
      { type: "read", title: "Read" },
    ];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {booksTypes.map((shelf, index) => (
              <BooksShelf
                key={index}
                shelf={shelf}
                books={books.filter((book) => book.shelf === shelf.type)}
                changeShelf={changeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Search</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksList;
