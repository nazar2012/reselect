import { useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { useSelector, useDispatch } from 'react-redux';
import { booksOperations, booksSelectors } from 'redux/books';
import PageHeading from 'components/PageHeading/PageHeading';

const makeSlug = string => slugify(string, { lower: true });

export default function BooksView() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const books = useSelector(booksSelectors.getBooks);
  const isLoading = useSelector(state => state.books.isLoading);
  const error = useSelector(state => state.books.error);

  useEffect(() => dispatch(booksOperations.fetchBooks()), [dispatch]);

  return (
    <>
      <PageHeading text="Книги" />

      {isLoading && <p>Завантаження книг...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && books.length === 0 && <p>Книг поки немає.</p>}

      {books.length > 0 && (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <Link
                to={{
                  pathname: `${url}/${makeSlug(`${book.title} ${book.id}`)}`,
                  state: {
                    from: {
                      location,
                      label: 'Назад до всіх книг',
                    },
                  },
                }}
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
