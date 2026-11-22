import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading/PageHeading';
import * as bookShelfAPI from '../services/bookshelf-api';

export default function BookDetailsView() {
  const location = useLocation();
  const { slug } = useParams();
  const bookId = slug.match(/(\d+)$/)?.[1];
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookId) {
      setError('Некоректне посилання на книгу');
      return;
    }

    bookShelfAPI
      .fetchBookById(bookId)
      .then(setBook)
      .catch(() =>
        setError('Не вдалося завантажити книгу. Перевір, чи запущений сервер.'),
      );
  }, [bookId]);

  return (
    <>
      <PageHeading text={`Книга ${slug}`} />

      <Link to={location?.state?.from?.location ?? '/books'}>
        {location?.state?.from?.label ?? 'Назад до книг'}
      </Link>

      {error && <p role="alert">{error}</p>}
      {!book && !error && <p>Завантаження книги...</p>}

      {book && (
        <>
          <hr />
          <img src={book.imgUrl} alt={book.title} />
          <h2>{book.title}</h2>
          <p>Автор: {book.author?.name || 'Невідомий автор'}</p>
          <p>{book.descr}</p>
        </>
      )}
    </>
  );
}
