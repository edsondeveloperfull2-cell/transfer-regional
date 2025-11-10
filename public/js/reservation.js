document.getElementById('reservationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('quoteBtn');
  const result = document.getElementById('result');
  btn.disabled = true;
  btn.textContent = 'Carregando...';
  result.textContent = '';

  const payload = {
    origin: e.target.origin.value,
    destination: e.target.destination.value,
    pickup: e.target.pickup.value,
    passengers: Number(e.target.passengers.value)
  };

  try {
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erro ao obter cotação');
    }
    const data = await res.json();
    result.innerHTML = `<strong>Valor:</strong> R$ ${(data.amount_cents/100).toFixed(2)}<br><small>Validade: ${data.expires_at || '60s'}</small>`;
  } catch (err) {
    result.textContent = `Erro: ${err.message}`;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Obter Cotação';
  }
});

