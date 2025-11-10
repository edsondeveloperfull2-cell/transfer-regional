const BASE_FARE_CENTS = 2500; // R$25,00
const PER_KM_CENTS = 300; // R$3,00 por km

exports.calculate = ({ distance_km, passengers }) => {
  let amount = BASE_FARE_CENTS + Math.round(distance_km * PER_KM_CENTS);
  if (passengers > 4) amount += 1500;
  return { amount_cents: amount, currency: 'BRL' };
};

