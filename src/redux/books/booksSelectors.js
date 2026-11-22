import { createSelector } from 'reselect';

const getBooksEntities = state => state.books.entities;

export const getBooks = createSelector(
  [getBooksEntities],
  entities => entities,
);

export const getBooksCount = createSelector([getBooks], books => books.length);
