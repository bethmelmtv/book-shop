const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/authors should return a list of authors', async () => {
    const resp = await request(app).get('/authors');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Fran Drescher' },
      { id: '2', name: 'Carol Candice' },
      { id: '3', name: 'Charles Dickens' },
      { id: '4', name: 'Dave Barbra' },
      { id: '5', name: 'Erin Aveeno' },
      { id: '6', name: 'Greg Mask' },
    ]);
  });

  it('/authors/:id should return author detail', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.status).toBe(200);
    expect(resp.body.id).toEqual('1');
    expect(resp.body.name).toEqual('Fran Drescher');
    expect(resp.body).toHaveProperty('books');
  });

  it('POST /authors should create a new author', async () => {
    const resp = await request(app)
      .post('/authors')
      .send({ name: 'Gem Gertrude' });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Gem Gertrude');
  });

  it('POST /authors should create a new author with an associated book', async () => {
    const resp = await request(app)
      .post('/authors')
      .send({ name: 'Rebekah Belete', bookIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Rebekah Belete');

    const { body: georgia } = await request(app).get(
      `/authors/${resp.body.id}`
    );
    expect(georgia.books.length).toBe(2);
  });

  afterAll(() => {
    pool.end();
  });
});
