require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:
    process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
});

app.use(cors());

app.get("/api/cities", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT country, city FROM public."Cities"'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
