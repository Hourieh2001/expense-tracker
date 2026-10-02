const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});


app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running"
  });
});


const PORT = 3000;


// GET ALL EXPENSES
app.get("/api/expenses", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        id,
        title,
        amount::float8,
        category,
        to_char(date, 'YYYY-MM-DD') AS date
      FROM expenses
      ORDER BY id;
    `);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


// GET ONE EXPENSE BY ID
app.get("/api/expenses/:id", async (req, res) => {

  const { id } = req.params;


  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }


  try {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        amount::float8,
        category,
        to_char(date, 'YYYY-MM-DD') AS date
      FROM expenses
      WHERE id = $1;
      `,
      [id]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }


    res.status(200).json(result.rows[0]);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});



// CREATE EXPENSE
app.post("/api/expenses", async (req, res) => {

  const { title, amount, category, date } = req.body || {};


  if (!title || !amount || !category || !date) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }


  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0"
    });
  }


  try {

    const result = await pool.query(
      `
      INSERT INTO expenses
      (title, amount, category, date)

      VALUES ($1, $2, $3, $4)

      RETURNING
        id,
        title,
        amount::float8,
        category,
        to_char(date, 'YYYY-MM-DD') AS date;
      `,
      [title, amount, category, date]
    );


    res.status(201).json(result.rows[0]);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});




// UPDATE EXPENSE
app.put("/api/expenses/:id", async (req, res) => {

  const { id } = req.params;

  const { title, amount, category, date } = req.body || {};


  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }


  if (!title || !amount || !category || !date) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }


  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0"
    });
  }


  try {


    const result = await pool.query(
      `
      UPDATE expenses

      SET
        title = $1,
        amount = $2,
        category = $3,
        date = $4

      WHERE id = $5


      RETURNING
        id,
        title,
        amount::float8,
        category,
        to_char(date, 'YYYY-MM-DD') AS date;
      `,
      [title, amount, category, date, id]
    );



    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }



    res.status(200).json(result.rows[0]);



  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});





// DELETE EXPENSE
app.delete("/api/expenses/:id", async (req, res) => {

  const { id } = req.params;



  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }



  try {


    const result = await pool.query(
      `
      DELETE FROM expenses

      WHERE id = $1


      RETURNING
        id,
        title,
        amount::float8,
        category,
        to_char(date, 'YYYY-MM-DD') AS date;
      `,
      [id]
    );



    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }



    res.status(200).json({
      message: "Expense deleted successfully",
      expense: result.rows[0]
    });



  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});





app.listen(PORT, "localhost", () => {
  console.log(`Server running on port:${PORT}`);
});