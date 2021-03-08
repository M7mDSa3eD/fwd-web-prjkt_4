import React from "react";
import * as Books from "./API/Books";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    Books.getAll()
      .then((books) => {
        this.setState({
          books,
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  changeShelf = (book, shelf) => {
    Books.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.id !== book.id).concat(book),
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Route exact path="/">
            {(() => {
              if (this.state.loading) {
                return (
                  <div
                    style={{
                      minHeight: "100vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "Center",
                      fontSize: "2rem",
                    }}
                  >
                    Loading
                  </div>
                );
              } else {
                return (
                  <BooksList
                    books={this.state.books}
                    changeShelf={this.changeShelf}
                  />
                );
              }
            })()}
          </Route>

          <Route path="/search">
            <SearchBooks
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          </Route>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
