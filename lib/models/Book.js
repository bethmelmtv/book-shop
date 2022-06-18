const pool = require('../utils/pool');

class Book {
  id;
  title;
  year;
  genre;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.year = row.year;
    this.genre = row.genre;
    this.authors = row.authors ?? [];
  }

  static async insert({ title, year, genre }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, year, genre) VALUES ($1, $2, $3) RETURNING *',
      [title, year, genre]
    );
    return new Book(rows[0]);
  }
  async addAuthorById(authorId) {
    await pool.query(
      'INSERT INTO books_authors (author_id, book_id) VALUES ($1, $2) RETURNING *',
      [authorId, this.id]
    );
    return this;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((row) => new Book(row));
  } // this model will get all books

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
    ) as authors from books 
      LEFT JOIN books_authors on books.id = books_authors.book_id 
      LEFT JOIN authors on books_authors.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }
}
module.exports = Book;
