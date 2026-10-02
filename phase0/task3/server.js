require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

const Port = 3000;


const pool = new Pool({

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    host: process.env.DB_HOST,

    port: process.env.DB_PORT,

    database: process.env.DB_NAME

});


app.get("/api/students", async (req,res)=>{

    try {

        const result = await pool.query(
            "SELECT * FROM students ORDER BY id"
        );

        res.json(result.rows);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});


app.listen(Port,()=>{

    console.log(`Server running on port:${Port}`);

});