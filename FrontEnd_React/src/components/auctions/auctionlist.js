import React from 'react';
import AuctionItem from './auctionitem';
import './auctions.css';

const AuctionList = ({ items }) => {
  return (
    <div className="auction-list">
      {items?.map(item => (
        <AuctionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AuctionList;
