import { Component } from "react";
import BookWidget from "./BookWidget";

class BooksShelf extends Component {
  render() {
    return (
      <div className="type, titleshelf">
        <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <BookWidget
                key={book.id}
                book={book}
                books={this.props.books}
                changeShelf={this.props.changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksShelf;
