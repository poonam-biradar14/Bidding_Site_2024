const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    startingBid: {
        type: Number,
        required: true,
        min: 0,
    },
    endDate: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created the auction
        required: true,
    },
    bids: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            amount: { type: Number, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);
