
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// For local development. Restrict this to your website's
// origin when you deploy.
app.use(cors());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Test the database connection
pool.query('SELECT NOW()')
    .then(() => console.log('PostgreSQL connected successfully'))
    .catch(error => console.error('PostgreSQL connection failed:', error.message));

// Homepage
app.get('/', (req, res) => {
    res.send('Product API is running!');
});

// Retrieve available products from PostgreSQL
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, description, price, category
             FROM products
             WHERE available = TRUE
             ORDER BY id`
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Failed to retrieve products:', error.message);

        res.status(500).json({
            error: 'Unable to load products'
        });
    }
});

// Optional alias for the menu
app.get('/api/menu', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, description, price, category
             FROM products ORDER BY id`
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Failed to retrieve menu:', error.message);

        res.status(500).json({
            error: 'Unable to load menu'
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});