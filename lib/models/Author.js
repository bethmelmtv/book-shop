const pool = require('../utils/pool');

class Author {
  id;
  name;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.books = row.books ?? [];
  }

  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name) VALUES ($1) RETURNING *',
      [name]
    );
    return new Author(rows[0]);
  }

  async addBookById(bookId) {
    await pool.query(
      'INSERT INTO books_authors (author_id, book_id) VALUES ($1, $2) RETURNING *',
      [this.id, bookId]
    );
    return this;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.*, 
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books.id IS NOT NULL), '[]'
    ) as books from authors 
      LEFT JOIN books_authors on authors.id = books_authors.author_id 
      LEFT JOIN books on books_authors.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }
}
module.exports = { Author };
