const express = require('express');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth'); // Middleware to protect routes
const router = express.Router();

// 1. Create an auction item (POST /api/auctions)
router.post('/', auth, async (req, res) => {
    const { title, description,imageName, startingBid, endDate } = req.body;
    try {
        const auction = new Auction({
            title,
            description,
            imageName,
            startingBid,
            endDate,
            user: req.user.id // Get user ID from the token
        });
        await auction.save();
        res.status(201).json(auction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// 2. Get all auction items (GET /api/auctions)
router.get('/', async (req, res) => {
    try {
        const auctions = await Auction.find().populate('user', 'name email');
        res.json(auctions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id/item', async (req, res) => {
    try {
        const auctions = await Auction.findById(req.params.id);
        res.json(auctions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const getAuctionsByUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters

        // Find auctions where 'user' matches the userId
        const auctions = await Auction.find({ user: userId });

        if (!auctions || auctions.length === 0) {
            return res.status(404).json({ message: 'No auctions found for this user' });
        }

        res.status(200).json(auctions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 3. Update an auction item (PUT /api/auctions/:id)
router.put('/:id/item', auth, async (req, res) => {
    const { title, description,imageName, startingBid, endDate } = req.body;
    try {
        let auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ msg: 'Auction not found' });
        }

        // Check if the user is the owner of the auction
        if (auction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        auction.title = title || auction.title;
        auction.description = description || auction.description;
        auction.imageName = imageName || auction.imageName;
        auction.startingBid = startingBid || auction.startingBid;
        auction.endDate = endDate || auction.endDate;

        await auction.save();
        res.json(auction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// 4. Delete an auction item (DELETE /api/auctions/:id)
router.delete('/:id/item', auth, async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ msg: 'Auction not found' });
        }

        // Check if the user is the owner of the auction
        if (auction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await auction.remove();
        res.json({ msg: 'Auction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:userId', getAuctionsByUser);

module.exports = router;
