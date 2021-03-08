import { Component } from "react";
import { Link } from "react-router-dom";
import * as Books from "../API/Books";
import BookWidget from "./BookWidget";

class SearchBooks extends Component {
  state = {
    query: "",
    books: [],
    loading: false,
  };

  search = (e) => {
    const query = e.target.value.trim();

    this.setState({ loading: true });
    this.setState({ query });

    if (query !== "") {
      Books.search(query.trim())
        .then((books) =>
          this.setState(() => {
            return books.length ? { books } : { books: [] };
          })
        )
        .then(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.search}
            />
          </div>
        </div>

        <div className="search-books-results">
          {(() => {
            if (this.state.books.length) {
              return (
                <ol className="books-grid">
                  {this.state.books.map((book) => {
                    return (
                      <BookWidget
                        key={book.id}
                        book={book}
                        books={this.props.books}
                        changeShelf={this.props.changeShelf}
                      />
                    );
                  })}
                </ol>
              );
            } else if (this.state.loading) {
              return "Loading";
            } else if (this.state.query === "") {
            } else {
              return "No Results";
            }
          })()}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
