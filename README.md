# Expense Tracker

A full-stack web application for tracking personal expenses.

## How to run

### **Backend**

1. Create a PostgreSQL database named `expense_tracker`.
2. Run `backend/schema.sql` in pgAdmin.
3. Go to the `backend` folder and install dependencies:

   npm install
   
4. Create a `.env` file using `.env.example` and add your PostgreSQL credentials.
5. Start the backend:

   node server.js
  
6. The API runs on:

   http://localhost:3000
   

### **Frontend**

1. Open `frontend/index.html` using **Live Server**.
2. Make sure the backend server is running.

## Features

* [✓] Add an expense (with validation)
* [✓] Delete an expense
* [✓] Edit an expense
* [✓] Filter by category
* [✓] Summary cards (total, count, highest)
* [✓] Data is saved in a PostgreSQL database
* [✓] Loading spinner and error alerts
* [✓] Responsive design
* [✓] Dark Mode


## Screenshots

Open `images` folder

## What was the hardest part?

The hardest part was connecting the frontend with the backend and handling API requests correctly. I solved this by testing the API endpoints and then connecting them to the frontend using JavaScript.

