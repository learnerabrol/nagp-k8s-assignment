const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('NAGP Employee API is running');
});

app.get('/employees', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Database error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
