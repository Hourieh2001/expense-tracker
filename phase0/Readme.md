 # Expense Tracker - Phase 0

## Overview
This phase includes three tasks to practice:
- JSON and Fetch API
- Async/Await
- Node.js and Express
- PostgreSQL connection

---

## Task 1: Fetch API + Bootstrap Cards

Used Fetch API to get users data from:
https://jsonplaceholder.typicode.com/users

Features:
- Fetch data using async/await.
- Convert response to JSON.
- Display users dynamically using Bootstrap cards.
- Show name, email, city, and company.


---

## Task 2: Express Server

Created a simple Node.js Express server that returns JSON data.

Endpoints:

### GET /api/hello
Returns a simple message.

### GET /api/expenses
Returns sample expenses data.


Run:
npm install express
node server.js
Server runs on:
http://localhost:3000

Testing:
- API endpoints were tested using Thunder Client.


---

## Task 3: Express + PostgreSQL

Connected Node.js Express server with PostgreSQL using the `pg` library.

Features:
- Created PostgreSQL database and table.
- Connected using environment variables.
- Used SQL queries with `pool.query`.
- Returned database data as JSON.

Database:
ExpenseTracker

Table:
students

Endpoint:
GET /api/students

Run:
npm install express pg dotenv
node server.js

Testing:
- Database API endpoint was tested using Thunder Client.

---

## Screenshots

Screenshots of the tested API endpoints using Thunder Client and browser are included to demonstrate successful server responses and database connectivity.

---

## Conclusion

Phase 0
The tasks demonstrate working with APIs, Express routes, and connecting Node.js with PostgreSQL.


