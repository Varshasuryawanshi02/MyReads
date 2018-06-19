import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookSearch from "./BookSearch";
import BookList from "./BookList";
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [] //To track books
  };

  //Call BookAPI.js to retrive all books
  componentDidMount() {
    this.updateData()
  }

  //To handle shelf change
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData()
    })
  }

  //To update the book in state
  updateData = () => {
    BooksAPI.getAll().then(data => {
            this.setState({
              books: data
            })
    });    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList currentBooks={this.state.books} />} />
        <Route
        path="/search"
        render={() =>
        <BookSearch updateShelf={this.updateShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp
