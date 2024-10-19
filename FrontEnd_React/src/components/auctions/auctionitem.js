import React, {useEffect, useState} from 'react';
import './auctions.css'
import airpods from '../../images/airpods.PNG';
import headphones from '../../images/headphones.PNG';
import powerbank from '../../images/powerbank.PNG';
import bluetooth from '../../images/bluetooth.PNG';
import camera from '../../images/camera.PNG';
import { useNavigate } from 'react-router-dom';

const AuctionItem = ({ item }) => {
  const { id, imageName, title, minBid, currentBid, endTime } = item;
  const [imagepath, setImagePath] = useState('');
  const navigate = useNavigate()
  useEffect(()=>{
    updateImagepathfromapi(imageName)
  },[]);

  const updateImagepathfromapi = (imgpath) => {
    let temppath = '';
  
    // Mapping the API image paths to the imported image assets
    switch (imgpath) {
      case 'airpods.PNG': 
        temppath = airpods; 
        break;
      case 'headphones.PNG': 
        temppath = headphones; 
        break;
      case 'powerbank.PNG': 
        temppath = powerbank; 
        break;
      case 'bluetooth.PNG': 
        temppath = bluetooth; 
        break;
      case 'camera.PNG': 
        temppath = camera; 
        break;
      default: 
        temppath = headphones; // Fallback to a default image if no match
        break;
    }
  
    setImagePath(temppath);
  };

  const handlebidnow =()=>{
    console.log('Auctionid',id);

    if(localStorage.getItem('jwtToken') === '' || localStorage.getItem('jwtToken') === undefined || localStorage.getItem('jwtToken') === null){
        navigate(`/login`);  
    }
    else{
    navigate(`/auction/${id}`);  
    }
  }

  return (
    <div className="auction-item">
      <img src={imagepath} alt={title} className="auction-image" />
      <div className="auction-info">
        <h3>{title}</h3>
        <p>Minimum Bid: <strong>${minBid}</strong></p>
        <p>Current Bid: <strong>${currentBid}</strong></p>
        <p>Ends in: {endTime}</p>
        <button className="bid-button" onClick={handlebidnow}>Bid now</button>
      </div>
    </div>
  );
};

export default AuctionItem;
