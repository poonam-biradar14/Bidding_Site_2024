import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import airpods from '../../images/airpods.PNG';
import headphones from '../../images/headphones.PNG';
import powerbank from '../../images/powerbank.PNG';
import bluetooth from '../../images/bluetooth.PNG';
import camera from '../../images/camera.PNG';
import './auctions.css'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importing Bootstrap JS for modals


const AuctionDetail = () => {
    const { auctionId } = useParams();
    const [auctionItem, setAuctionItem] = useState(null);
    const [bidHistory, setBidHistory] = useState([]);
    const [newBid, setNewBid] = useState({ minBid: 0, maxBid: 0 });
    const [imagepath, setImagePath] = useState('');
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // Fetch auction item details and bid history on page load
    useEffect(() => {
        fetchAuctionItem();
        fetchBidHistory();
    }, [auctionId]);

    const fetchAuctionItem = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auctions/${auctionId}/item`);
            setAuctionItem(response.data);
            updateImagepathfromapi(response.data?.imageName)
        } catch (error) {
            console.error("Error fetching auction item:", error);
        }
    };

    const fetchBidHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auctions/${auctionId}/bids`);
            setBidHistory(response.data);
        } catch (error) {
            console.error("Error fetching bid history:", error);
        }
    };

    const handleBidChange = (e) => {
        const { name, value } = e.target;

        // If the changed field is "minBid", also update "maxBid" to be minBid + 5
        if (name === 'minBid') {
            const minBidValue = parseFloat(value); // Ensure it's treated as a number
            setNewBid((prev) => ({
                ...prev,
                minBid: minBidValue,
                maxBid: minBidValue + 5, // Automatically set maxBid to minBid + 5
            }));
        } else {
            setNewBid((prev) => ({
                ...prev,
                [name]: value, // Handle changes for other inputs like maxBid
            }));
        }
    };
    const handleBidSubmit = async () => {
        try {
            const toSenddata = { "amount": newBid.maxBid }
            const response = await axios.post(`http://localhost:5000/api/auctions/${auctionId}/bid`, toSenddata, {
                headers: {
                    'x-auth-token': localStorage.getItem('jwtToken'), // Set the x-auth-token header
                }
            });
            fetchBidHistory(); // Refresh the bid history after a successful bid
            setNewBid({ minBid: 0, maxBid: 0 });
            // Show success message
            setShowSuccessMessage(true);

            // Close modal after 2 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
                document.getElementById('closeModalButton').click();
            }, 2000);
        } catch (error) {
            console.error("Error submitting bid:", error);
        }
    };


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

    return auctionItem ? (
        <div className="auction-detail">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        {/* Left Column: Auction Item Details */}
                        <div className="auction-item">
                            <button onClick={() => { navigate('/auctionlist') }} className="btn btn-link text-primary p-0">&lt; Back to catalog</button>
                            <img src={imagepath} alt={auctionItem.title} />
                            <h2>{auctionItem.title}</h2>
                            <p>Minimum Bid: ${auctionItem.startingBid}</p>
                            <p>Current Bid: ${auctionItem.currentBid}</p>
                            <p>
                                Ends in: {format(new Date(auctionItem.endDate), "dd MMM yyyy hh:mm a")}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-7">
                        {/* Right Column: Bid History and New Bid Form */}
                        <div className="auction-details-right">
                            <h3>Description</h3>
                            <p>{auctionItem.description}</p>

                            <h3>Reviews</h3>
                            <div className="reviews">
                                {/* Add your reviews component here */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <h3>Bid History</h3>
                        <ul>
                            {bidHistory.map((bid) => (
                                <li key={bid._id} className="bid-history-item">
                                    {bid.user.name} bids ${bid.amount}
                                    {/* on{" "} {format(new Date(bid.createdAt), "dd MMM yyyy hh:mm a")} */}
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex justify-content-center align-items-center">

                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bidModal" >Bid now</button>

                        </div>
                    </div>
                </div>



                {/* Modal for submitting a bid */}
                {(
                    <div className="modal fade" id="bidModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal Title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {showSuccessMessage ? (
                                        <p>Bid submitted successfully!</p>
                                    ) : (

                                        <div className="bid-modal">
                                            <h2>Submit Bid | {auctionItem.title}</h2>
                                            <div>
                                                <label>Straight Bid</label>
                                                <input
                                                    type="number"
                                                    name="minBid"
                                                    value={newBid.minBid}
                                                    onChange={handleBidChange}
                                                />
                                            </div>
                                            <div>
                                                <label>Maximum Bid</label>
                                                <input
                                                    type="number"
                                                    name="maxBid"
                                                    value={newBid.maxBid}
                                                    onChange={handleBidChange}
                                                />
                                            </div>
                                            <div className="bid-details">
                                                <p>Minimum Bid: ${auctionItem.startingBid}</p>
                                                <p>Current Bid: ${auctionItem.currentBid}</p>
                                                <p>
                                                    Ends in: {format(new Date(auctionItem.endDate), "dd MMM yyyy hh:mm a")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModalButton">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleBidSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default AuctionDetail;
