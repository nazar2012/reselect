import { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import * as bookShelfAPI from '../services/bookshelf-api';
import PageHeading from '../components/PageHeading/PageHeading';
// import AuthorSubView from './AuthorSubView';

const AuthorSubView = lazy(() =>
  import('./AuthorSubView.js' /* webpackChunkName: "authors-subview"*/),
);

export default function AuthorsView() {
  const { url, path } = useRouteMatch();
  const [authors, setAuthors] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    bookShelfAPI
      .fetchAuthors()
      .then(setAuthors)
      .catch(() => {
        setError(
          'Не вдалося завантажити авторів. Перевір, чи запущений сервер.',
        );
      });
  }, []);

  return (
    <>
      <PageHeading text="Автори" />

      {error && <p role="alert">{error}</p>}
      {!authors && !error && <p>Завантаження авторів...</p>}

      {authors && (
        <ul>
          {authors.map(author => (
            <li key={author.id}>
              <NavLink to={`${url}/${author.id}`}>{author.name}</NavLink>
            </li>
          ))}
        </ul>
      )}
      <hr />

      <Suspense fallback={<h1>Завантажуємо підмаршрут...</h1>}>
        <Route path={`${path}/:authorId`}>
          {authors && <AuthorSubView authors={authors} />}
        </Route>
      </Suspense>
    </>
  );
}
