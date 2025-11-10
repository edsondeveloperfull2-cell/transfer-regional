const PriceService = require('../services/priceService');

exports.createQuote = async (req, res) => {
  try {
    const payload = req.body;
    const distance_km = payload.distance_km || 20;
    const quote = PriceService.calculate({ distance_km, passengers: payload.passengers || 1 });
    const expiresAt = new Date(Date.now() + 60 * 1000).toISOString();
    res.json({ amount_cents: quote.amount_cents, currency: quote.currency, expires_at: expiresAt });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno ao calcular cotação' });
  }
};

