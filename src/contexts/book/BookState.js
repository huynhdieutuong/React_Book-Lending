import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import { SET_LOADING, SET_TEXT_SEARCH, GET_BOOKS, GET_BOOK } from '../types';

const BookState = (props) => {
  const initialState = {
    loading: false,
    books: [],
    book: {},
    pagination: {},
    textSearch: '',
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const { books, book, loading, pagination, textSearch } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Text Search
  const setTextSearch = (text) =>
    dispatch({ type: SET_TEXT_SEARCH, payload: text });

  // Get books
  const getBooks = async (text = '', page = 1, perPage = 10) => {
    setLoading();

    const res = await axios.get(
      `/api/books?page=${page}&perPage=${perPage}&q=${text}`
    );

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  };

  // Get book
  const getBook = async (id) => {
    setLoading();

    const res = await axios.get(`/api/books/${id}/view`);

    dispatch({
      type: GET_BOOK,
      payload: res.data,
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        book,
        loading,
        pagination,
        textSearch,
        getBooks,
        setTextSearch,
        getBook,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;