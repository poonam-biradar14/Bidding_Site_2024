// // server.js
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Connect to the database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Body parser

// // Basic route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Import Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api', userRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Adjust the path if necessary
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');

const app = express();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes); // Auction routes
app.use('/api/auctions', bidRoutes); // Bidding routes

// Connect to MongoDB (make sure your MongoDB is running)
mongoose.connect('mongodb://localhost:27017/bidding-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
