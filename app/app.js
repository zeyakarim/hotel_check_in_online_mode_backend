const express = require('express');
const hotelRoutes = require('./hotels/routes');
const userRoutes = require('./users/routes');
const bookingRoutes = require('./bookings/routes');

const cors = require('cors');
// initialize the application
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.origin || "http://localhost:5173", // Default for dev
    contentType: ['application/json', 'multipart/form-data'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "X-Forwarded-For",
    ],
  })
);

app.use(
    express.json({
      limit: '1024mb',
    }),
);

app.use('/api/hotels', hotelRoutes);

app.use('/api/users', userRoutes);

app.use('/api/bookings', bookingRoutes);

module.exports = app;