const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      await Promise.all(req.body.authorIds.map((id) => book.addAuthorById(id)));
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const books = await Book.getAll();
      res.json(books);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);
      res.json(book);
    } catch (e) {
      next(e);
    }
  });
