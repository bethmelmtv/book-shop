const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.only('POST /books should create a new book with an associated Author', async () => {
    const resp = await request(app)
      .post('/books')
      .send({
        title: 'Winnie the Pooh',
        year: 1940,
        genre: 'horror',
        authorIds: [1, 2],
      });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toBe('Winnie the Pooh');

    const { body: winnie } = await request(app).get(`/books/${resp.body.id}`);
    expect(winnie.authors.length).toBe(2);
  });

  afterAll(() => {
    pool.end();
  });
});
