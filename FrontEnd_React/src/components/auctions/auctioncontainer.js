import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuctionList from './auctionlist';
import { getUserIdFromToken } from '../../utils/utils';
const AuctionContainer = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch auction items from API
  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const userId = getUserIdFromToken(localStorage.getItem('jwtToken'));        
        const response = await axios.get(`http://localhost:5000/api/auctions/${userId.id}`); 
        // const response = await axios.get(`http://localhost:5000/api/auctions`); 
        const auctions = response.data;

        // Map the API response to the format needed for AuctionList
        const formattedAuctions = auctions.map(auction => ({
          id: auction._id,
          title: auction.title,
          imageName: auction.imageName, 
          minBid: auction.startingBid,
          currentBid: auction.bids.length > 0 ? auction.bids[auction.bids.length - 1].amount : auction.startingBid,
          endTime: new Date(auction.endDate).toLocaleString(), // Format the end time
        }));

        setAuctionItems(formattedAuctions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch auctions');
        setLoading(false);
      }
    };

    fetchAuctionItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <AuctionList items={auctionItems} />
    </div>
  );
};

export default AuctionContainer;
