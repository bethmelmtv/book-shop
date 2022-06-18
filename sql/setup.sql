-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists books_authors;
DROP table if exists books;
DROP table if exists authors;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  year INT NOT NULL,
  genre VARCHAR NOT NULL
);

INSERT INTO books (title, year, genre) VALUES 
('A Midsummer Nights Dream', 1704, 'drama'),
('Hamlet', 1249, 'horror'),
('Romeo and Juliet', 1203, 'nonfiction'),
('Merchant of Venice', 1903, 'fiction'),
('Julius Ceasar', 1694, 'scandal'),
('Macbeth', 1294, 'romance'),
('Othello', 1594, 'drama');


CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO authors (name) VALUES
('Fran Drescher'),
('Carol Candice'),
('Charles Dickens'),
('Dave Barbra'),
('Erin Aveeno'),
('Greg Mask');




CREATE table books_authors(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id BIGINT,
  book_id BIGINT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books_authors (book_id, author_id) VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 3),
  (4, 3),
  (5, 4);