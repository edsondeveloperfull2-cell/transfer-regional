// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/views', express.static(path.join(__dirname, '../public/views')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/api', reservationRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;

