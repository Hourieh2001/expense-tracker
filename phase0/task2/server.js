const express = require("express");

const app = express();

const port = 3000;


// Route 1
app.get("/api/hello", (req,res)=>{

    res.json({
        message:"Hello from my server"
    });

});


// Route 2
app.get("/api/expenses", (req,res)=>{

    const expenses = [

        {
            id:1,
            title:"Lunch",
            amount:4.5,
            category:"Food",
            date:"2026-01-15"
        },

        {
            id:2,
            title:"Bus ticket",
            amount:1.2,
            category:"Transport",
            date:"2026-01-15"
        }

    ];

    res.json(expenses);

});


app.listen(port,()=>{

    console.log(`Server running on port ${port}`);

});