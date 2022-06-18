const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const authors = await Author.insert(req.body);
      if (req.body.bookIds) {
        await Promise.all(
          req.body.bookIds.map((id) => authors.addBookById(id))
        );
      }
      res.json(authors);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const authors = await Author.getById(req.params.id);
      res.json(authors);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    const respData = authors.map(({ id, name }) => ({ id, name }));
    res.json(respData);
  });
