const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT);

module.exports = app;

// JSON
app.use(express.json());

// Blank Route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running.' });
});

// Health Check
// app.get('/health', async (req, res) => {
//   try {
//     const rows = await sql`SELECT 1 AS ok`;
//     res.json({ message: 'Database connected', result: rows[0] });
//   } catch (error) {
//     console.error('Health check failed:', error);
//     res.status(500).json({ error: 'Database connection failed' });
//   }
// });