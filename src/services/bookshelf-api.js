const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4040';

async function getData(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Помилка запиту: ${response.status}`);
  }

  return response.json();
}

export function fetchAuthors() {
  return getData('/authors?_embed=books');
}

export function fetchBooks() {
  return getData('/books');
}

export function fetchBookById(bookId) {
  return getData(`/books/${bookId}?_expand=author`);
}
