// Create new reservation
app.post('api/listings/:id/reserve', async (req, res) => {
    const listingID = Number(req.params.id);
    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({ error: 'ID must be a positive integer' });
    }

    try {
        const rows =  await sql`
        INSERT INTO Reservations VALUES (req.params.userID, req.params.listingID, req.params.address, 'Reserved', NULL)
        `;
        return res.status(201).json(rows[0]);
    } catch (e) {
        console.error('Error when creating reservation: ', e);
        return res.status(500).json({error: 'Could not create reservation'});
    }
})

// Get reservation
app.get('api/reservations/:id', async (req, res) => {
    const id = Number(req.params.id);
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
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(rows[0]);
    } catch (e) {
        console.error('Error when retrieving reservation record: ', e);
        return res.status(500).json({error: 'Could not retrieve reservation'});
    }
})