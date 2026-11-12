import sql from '../models/db.js'

// Create new reservation
const createReservation = async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);
    const nAddress = String(req.params.address);

    // Checks for valid listing ID
    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({error: 'Listing ID must be a positive integer'});
    }

    // Checks for valid user ID
    if (!Number.isSafeInteger(userID) || userID < 1){
        return res.status(400).json({error: 'User ID must be a positive integer'});
    }

    // Checks for valid address
    if (nAddress === ''){
        return res.status(400).json({error: 'Address must be provided'})
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
};

// Get reservation record
const getReservation = (async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);

    // Checks for valid listing ID
    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({error: 'Listing ID must be a positive integer'});
    }

    // Checks for valid user ID
    if (!Number.isSafeInteger(userID) || userID < 1){
        return res.status(400).json({error: 'User ID must be a positive integer'});
    }

    try {
        const rows = await sql`
        SELECT userID, listingID, rAddress, deliveryStatus, completedAt
        FROM Reservation
        WHERE userID = ${userID} AND listingID = ${listingID}
        `;

        if (rows.length === 0) {
        return res.status(404).json({error: 'Reservation not found'});
        }
        return res.json(rows[0]);
    } catch (e) {
        console.error('Error when retrieving reservation record: ', e);
        return res.status(500).json({error: 'Could not retrieve reservation'});
    }
});

// Confirm reservation by adding delivery address
const confirmReservation = async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);

    // Checks for valid listing ID
    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({error: 'Listing ID must be a positive integer'});
    }

    // Checks for valid user ID
    if (!Number.isSafeInteger(userID) || userID < 1){
        return res.status(400).json({error: 'User ID must be a positive integer'});
    }

    try {
        const rows =  await sql`
        UPDATE Reservations SET deliveryStatus = "Confirmed" WHERE userID = ${userID} AND listingID = ${listingID} 
        `;
        return res.status(201).json(rows[0]);
    } catch (e) {
        console.error('Error when coonfirming reservation: ', e);
        return res.status(500).json({error: 'Could not confirm reservation'});
    }
};

const closeReservation = async (req, res) => {
    const listingID = Number(req.params.listingID);
    const userID = Number(req.params.userID);
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Checks for valid listing ID
    if (!Number.isSafeInteger(listingID) || listingID < 1){
        return res.status(400).json({error: 'Listing ID must be a positive integer'});
    }

    // Checks for valid user ID
    if (!Number.isSafeInteger(userID) || userID < 1){
        return res.status(400).json({error: 'User ID must be a positive integer'});
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
};

export { createReservation, getReservation, confirmReservation, closeReservation }