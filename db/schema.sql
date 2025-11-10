CREATE TYPE reservation_status AS ENUM ('PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES users(id),
  plate VARCHAR(20) UNIQUE NOT NULL,
  model VARCHAR(100),
  seats INTEGER,
  status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  distance_km DECIMAL(7,2)
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES users(id),
  driver_id INTEGER REFERENCES users(id),
  vehicle_id INTEGER REFERENCES vehicles(id),
  route_id INTEGER REFERENCES routes(id),
  pickup_datetime TIMESTAMP NOT NULL,
  dropoff_datetime TIMESTAMP,
  passengers INTEGER DEFAULT 1,
  status reservation_status DEFAULT 'PENDING',
  price_cents INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE price_quotes (
  id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES reservations(id),
  amount_cents INTEGER,
  currency VARCHAR(10) DEFAULT 'BRL',
  expires_at TIMESTAMP
);

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES users(id),
  vehicle_id INTEGER REFERENCES vehicles(id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  reservation_id INTEGER REFERENCES reservations(id)
);

CREATE INDEX idx_reservations_pickup ON reservations(pickup_datetime);
CREATE INDEX idx_schedules_driver_time ON schedules(driver_id, start_time, end_time);

