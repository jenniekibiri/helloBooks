import bookReducer from '../../reducers/bookReducer';
import initialState from '../../reducers/initialState';
import { getBook } from '../../actions/bookActions/viewBook';

import { getBorrowedBooksAction,
  fetchingBorrowedBooks,
  returnBookAction } from '../../actions/bookActions/borrowedBooks';
import { fetchingBooks,
  getMoreBooks,
  getBooks,
  setPagination,
  borrowBookAction,
  getBookCategoriesAction
} from '../../actions/bookActions/library';

import { deleteBookAction } from '../../actions/adminActions/books';


let action;
let newState;
const books = [
  { id: 1, title: 'awesomeness', total: 10 },
  { id: 2, title: 'more awesome', total: 5 }
];

const categories = [
  { id: 1, category: 'javascript' },
  { id: 2, category: 'python' }
];

const pagination = {
  pageSize: 1,
  pageNumber: 1,
  pageCount: 1,
  total: 1
};


describe('Book Reducer', () => {
  it('should return initial state for unknown action types', () => {
    action = { type: null };
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).toEqual(initialState.bookReducer);
  });

  it('should handle actions of type FETCHING_BORROWED_BOOKS', () => {
    action = fetchingBorrowedBooks(true);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.fetchingBorrowedBooks).toEqual(true);
  });

  it('should handle actions of type GET_BORROWED_BOOKS', () => {
    action = getBorrowedBooksAction(books);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.borrowedBooks).toEqual(books);
    expect(newState.borrowedBooks[1].id).toBe(2);
  });

  it('should handle actions of type BORROW_BOOK', () => {
    initialState.bookReducer.books = books;
    action = borrowBookAction(1);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.books[0].total).toBe(9);
    expect(newState.books[0].title).toBe('awesomeness');
  });

  it('should handle actions of type RETURN_BOOK', () => {
    action = returnBookAction(1);
    initialState.bookReducer.borrowedBooks = books;
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.borrowedBooks.length).toBe(1);
  });

  it('should handle actions of type GET_BOOK', () => {
    const book = { id: 1, title: 'awesome book' };
    action = getBook(book);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.currentBook).toEqual(book);
  });

  it('should handle actions of type GET_BOOKS', () => {
    action = getBooks(books);
    initialState.bookReducer.books = [];
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.books).toEqual(books);
    expect(JSON.stringify(newState.books)).toEqual(JSON.stringify(books));
  });

  it('should handle actions of type GET_MORE_BOOKS', () => {
    initialState.bookReducer.books = [{ id: 5, title: 'weird' }];
    const expected = [...initialState.bookReducer.books, ...books];
    action = getMoreBooks(books);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.books).toEqual(expected);
  });

  it('should handle actions of type FETCHING_MORE_BOOKS', () => {
    action = fetchingBooks(true);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.fetchingBooks).toBe(true);
  });

  it('should handle actions of type GET_BOOK_CATEGORIES', () => {
    action = getBookCategoriesAction(categories);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.categories.length).toBe(2);
    expect(newState.categories[0].category).toBe('javascript');
  });

  it('should handle actions of type SET_LIBRARY_PAGINATION', () => {
    action = setPagination(pagination);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.pagination).toEqual(pagination);
    expect(newState.pagination.pageSize).toBe(1);
  });

  it('should handle actions of type DELETE_BOOK', () => {
    action = deleteBookAction(5);
    newState = bookReducer(initialState.bookReducer, action);
    expect(newState).not.toEqual(initialState.bookReducer);
    expect(newState.length).toBe(0);
  });
});
