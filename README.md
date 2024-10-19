# Full-Stack Online Bidding System

## Problem Statement

The goal of this project is to build a full-stack web application that allows users to participate in an online bidding system. This application includes user authentication, auction item listing, bidding functionality, and a user-friendly interface for managing and viewing bids. The exercise is designed to assess the candidate's ability to design, implement, and document a complete web application.

## Use Cases Covered

### 1. User Registration and Authentication
- **Register**: As a user, I want to register with my username, email, and password so that I can create an account.
- **Login**: As a user, I want to log in with my email and password so that I can access my account.

### 2. Auction Management
- **Create Auction Item**: As a user, I want to create auction items with a title, description, starting bid, and end date so that I can sell items.
- **View Auction Items**: As a user, I want to view all available auction items so that I can find items to bid on.
- **Update Auction Item**: As a user, I want to update my auction items so that I can correct any mistakes or add new information.
- **Delete Auction Item**: As a user, I want to delete my auction items so that I can remove items I no longer wish to sell.

### 3. Bidding Functionality
- **Place Bid**: As a user, I want to place bids on auction items so that I can participate in auctions.
- **View Current Highest Bid**: As a user, I want to view the current highest bid and bid history for an auction item so that I can make informed bidding decisions.

## Tech Stack Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Features

- User registration, login, and authentication (JWT-based)
- CRUD (Create, Read, Update, Delete) operations for auction items
- Real-time bidding functionality with notifications for outbid alerts
- User-friendly interface built with React
- API endpoints for backend operations using Express.js
- MongoDB as the database for storing user and auction data

---

## Project Structure
project-root/
├── frontend/            # Frontend code (React)
│   ├── public/
│   ├── src/
│   ├── package.json     # Frontend dependencies
│   └── ...
├── backend/             # Backend code (Node.js)
│   ├── src/
│   ├── server.js        # Express server setup
│   ├── package.json     # Backend dependencies
│   └── ...
└── README.md

## Installation & Setup

Prerequisites
Before running the project, ensure you have the following installed:

- **Node.js**: (version 12 or higher)
- **MongoDB**: (for local development) or access to a remote MongoDB database
- **NPM**:  (Node package manager)


## Running the Backend (Node.js)

### 1. Navigate to the backend directory:
- cd Backend_Node

### 2. Install dependencies::
- npm install

### 3. Configure the environment variables. Create a .env file in the backend/ directory with the following content (replace the placeholders):
- PORT=5000
- MONGO_URI=mongodb://localhost:27017/bidding-db
- JWT_SECRET=your_secret_key

### 4. Start the backend server:
- npm run dev

The server will run on http://localhost:5000.


## Running the FrontEnd (react.js)

### 1. Navigate to the backend directory:
- cd Frontend_React

### 2. Install dependencies::
- npm install

### 3. Start the front server:
- npm start

The server will run on http://localhost:3000.
