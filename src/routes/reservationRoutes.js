const app = require('express');
const router = app.Router();
const rController = require('../controllers/reservationController');

// Create new reservation
// router.post('api/listings/:listingID/reserve', rController.createReservation);

app.post('api/listings/:id/reserve', async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);
    const nAddress = String(req.params.address);

    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({ error: 'ID must be a positive integer' });
    }

    try {
        const rows =  await sql`
        INSERT INTO Reservations VALUES (${userID}, ${listingID}, ${nAddress}, 'Reserved', NULL)
        `;
        return res.status(201).json(rows[0]);
    } catch (e) {
        console.error('Error when creating reservation: ', e);
        return res.status(500).json({error: 'Could not create reservation'});
    }
})

// Get reservation
app.get('api/reservations/:id', async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);

    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({ error: 'ID must be a positive integer' });
    }

    try {
        const rows = await sql`
        SELECT userID, listingID, rAddress, deliveryStatus, completedAt
        FROM Reservation
        WHERE userID = ${userID} AND listingID = ${listingID}
        `;

        if (rows.length === 0) {
        return res.status(404).json({ error: 'Reservation not found' });
        }
        return res.json(rows[0]);
    } catch (e) {
        console.error('Error when retrieving reservation record: ', e);
        return res.status(500).json({error: 'Could not retrieve reservation'});
    }
})

// Confirm reservation
app.post('api/reservations/:id/confirm', async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);
    const dAddress = String(req.params.address);

    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({ error: 'ID must be a positive integer' });
    }

    try {
        const rows =  await sql`
        UPDATE Reservations SET deliveryStatus = "Confirmed", rAddress = '${dAddress}' WHERE userID = ${userID} AND listingID = ${listingID} 
        `;
        return res.status(201).json(rows[0]);
    } catch (e) {
        console.error('Error when coonfirming reservation: ', e);
        return res.status(500).json({error: 'Could not confirm reservation'});
    }
})

// Close reservation
app.post('api/reservations/:id/close', async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({ error: 'ID must be a positive integer' });
    }

    try {
        const rows =  await sql`
        UPDATE Reservations SET deliveryStatus = 'Complete', completedAt = '${date}' WHERE userID = ${userID} AND listingID = ${listingID} 
        `;
        return res.status(201).json(rows[0]);
    } catch (e) {
        console.error('Error when closing reservation: ', e);
        return res.status(500).json({error: 'Could not close reservation'});
    }
})