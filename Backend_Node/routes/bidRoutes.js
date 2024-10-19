const express = require('express');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth'); // Middleware for authentication
const router = express.Router();

// 1. Place a bid (POST /api/auctions/:id/bid)
router.post('/:id/bid', auth, async (req, res) => {
    const { amount } = req.body;
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ msg: 'Auction not found' });
        }

        // Check if auction has ended
        if (new Date() > auction.endDate) {
            return res.status(400).json({ msg: 'Auction has already ended' });
        }

        // Check if bid is higher than the current highest bid or starting bid
        const highestBid = auction.bids.length > 0 ? auction.bids[auction.bids.length - 1].amount : auction.startingBid;
        if (amount <= highestBid) {
            return res.status(400).json({ msg: 'Bid must be higher than the current highest bid' });
        }

        // Add the new bid to the auction
        auction.bids.push({
            user: req.user.id,
            amount
        });

        await auction.save();

        // TODO: Send notifications to the previous highest bidder that they've been outbid

        res.json(auction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// 2. Get the highest bid for an auction item (GET /api/auctions/:id/highestBid)
router.get('/:id/highestBid', async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ msg: 'Auction not found' });
        }

        // Get the highest bid or starting bid if no bids have been placed
        const highestBid = auction.bids.length > 0 ? auction.bids[auction.bids.length - 1].amount : auction.startingBid;
        res.json({ highestBid });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// 3. Get bid history for an auction item (GET /api/auctions/:id/bids)
router.get('/:id/bids', async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id).populate('bids.user', 'name email');
        if (!auction) {
            return res.status(404).json({ msg: 'Auction not found' });
        }

        res.json(auction.bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
