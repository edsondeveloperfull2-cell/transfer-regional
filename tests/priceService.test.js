const PriceService = require('../src/services/priceService');

describe('PriceService.calculate', () => {
  test('calcula valor base para distância 0 e 1 passageiro', () => {
    const result = PriceService.calculate({ distance_km: 0, passengers: 1 });
    expect(result).toHaveProperty('amount_cents');
    expect(result.currency).toBe('BRL');
    expect(typeof result.amount_cents).toBe('number');
    expect(result.amount_cents).toBe(2500);
  });

  test('calcula valor proporcional à distância', () => {
    const r1 = PriceService.calculate({ distance_km: 10, passengers: 1 });
    const r2 = PriceService.calculate({ distance_km: 20, passengers: 1 });
    expect(r2.amount_cents).toBeGreaterThan(r1.amount_cents);
    expect(r2.amount_cents - r1.amount_cents).toBeGreaterThan(0);
  });

  test('aplica taxa extra para passageiros > 4', () => {
    const normal = PriceService.calculate({ distance_km: 10, passengers: 3 });
    const extra = PriceService.calculate({ distance_km: 10, passengers: 6 });
    expect(extra.amount_cents).toBeGreaterThan(normal.amount_cents);
  });
});

