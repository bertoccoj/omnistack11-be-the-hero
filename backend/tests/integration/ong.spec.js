const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create a ONG', async () => {

    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'BACON',
        email: 'bacon@comigda.com',
        whatsapp: '43983434343',
        city: 'Cambé',
        uf: 'PR',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
})
