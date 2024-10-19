// Footer.js
import React, {useState, useEffect} from 'react';
import homepage from '../../images/homepage.PNG'
import AuctionList from '../auctions/auctionlist';
import axios from 'axios';

const MainLayout = () => {
    const [auctionItems, setAuctionItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch auction items from API
    useEffect(() => {
      const fetchAuctionItems = async () => {
        try {    
          const response = await axios.get(`http://localhost:5000/api/auctions`); 
          const auctions = response.data;
  
          // Map the API response to the format needed for AuctionList
          const formattedAuctions = auctions.map(auction => ({
            id: auction._id,
            title: auction.title,
            imageName: auction.imageName, 
            minBid: auction.startingBid,
            currentBid: auction.bids.length > 0 ? auction.bids[auction.bids.length - 1].amount : auction.startingBid,
            endTime: new Date(auction.endDate).toLocaleString(), 
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
      <div className="container">
          <img src={homepage} alt="home page" className="img-fluid" />
          {
            auctionItems ? 
            <AuctionList items={auctionItems} />: "No Auctions Items to Display"
          }
      </div>
  );
};

export default MainLayout;
