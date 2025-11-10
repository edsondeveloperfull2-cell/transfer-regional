const request = require('supertest');
const app = require('../src/app');

describe('POST /api/quotes', () => {
  test('retorna cotação válida quando payload correto', async () => {
    const payload = {
      origin: 'Aeroporto',
      destination: 'Centro',
      pickup: '2025-11-10T10:00:00',
      passengers: 2,
      distance_km: 15
    };

    const res = await request(app)
      .post('/api/quotes')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('amount_cents');
    expect(res.body.currency).toBe('BRL');
    expect(res.body).toHaveProperty('expires_at');
  });

  test('com payload vazio retorna cotação usando defaults (comportamento atual)', async () => {
    const res = await request(app)
      .post('/api/quotes')
      .send({})
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('amount_cents');
  });
});

