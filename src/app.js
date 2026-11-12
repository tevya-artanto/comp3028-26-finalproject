const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const organisationRoutes = require('./routes/organisationRoutes');
const reservationRoutes = require('./routes/reservationRoutes')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/organisations', organisationRoutes);
app.use('./api/reservations', reservationRoutes)