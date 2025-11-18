# Cities Quiz

A simple web quiz app where you guess the capital city of a given country. Data is loaded from a PostgreSQL database via a Node.js (Express) API.

## Features
- 10 random questions per game
- Each question: "What is the capital of [Country]?"
- 1 correct and 9 random incorrect options per question
- Instant result and score after checking answers

## How to run
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file with PostgreSQL connection variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=Cities
   DB_USER=your_user
   DB_PASSWORD=your_password
   ```
4. Start the backend server:
   ```
   node server.js
   ```
5. Open `index.html` in your browser

## Tech stack
- Node.js + Express (API)
- PostgreSQL (database)
- HTML, CSS, JavaScript (frontend)

## Author
Inna Likhacheva
