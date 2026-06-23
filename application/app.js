const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "postgres-service",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "employee_db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres123",
});

app.get("/", (req, res) => {
  res.send("Employee API is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date(),
  });
});

app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, department FROM employees ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({
      error: "Failed to fetch employees",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Employee API running on port ${PORT}`);
});