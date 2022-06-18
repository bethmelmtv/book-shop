const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      // creates a new row in the pets table in the database
      const book = await Book.insert(req.body);
      // loops through each id in the ownerIds array in the request body
      // calls addOwnerById with each id
      // addOwnerById adds a new row in the pets_owners database
      await Promise.all(req.body.authorIds.map((id) => book.addAuthorById(id)));
      res.json(book);
    } catch (e) {
      next(e);
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
