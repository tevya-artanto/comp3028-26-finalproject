const app = require('express');
const router = app.Router();
const rController = require('../controllers/reservationController');

// Create new reservation
router.post('api/listings/:listingID/reserve', rController.createReservation);
// Get specific reservation
router.get('api/reservations/:id', rController.getReservation);
// Confirm reservation
router.put('api/reservations/:id/confirm', rController.confirmReservation);
// Close reservation (Mark as successful)
router.put('api/reservations/:id/close', rController.closeReservation);