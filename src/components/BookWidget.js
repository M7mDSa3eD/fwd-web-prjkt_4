import { Component } from "react";

class BookWidget extends Component {
  render() {
    const { book, books, changeShelf } = this.props;

    let defaultValue = "none";

    books.map((b) => {
      if (b.id === book.id) {
        defaultValue = b.shelf;
      }
    });
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks.thumbnail : undefined
                })`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                onChange={(e) => changeShelf(book, e.target.value)}
                defaultValue={defaultValue}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
            ;
          </div>
          <div className="book-title">{book.title || "Untitled"}</div>
          <div className="book-authors">
            {book.authors && book.authors.length && book.authors.join()}
          </div>
        </div>
      </li>
    );
  }
}

export default BookWidget;
