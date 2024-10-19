// Header.js
import React, { useState, useEffect} from 'react';
import './header.css';
import logo from '../../images/logo.PNG'
import { Link } from 'react-router-dom';  
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../../utils/utils';
import CIcon from '@coreui/icons-react';
import { cilUser } from '@coreui/icons';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  // Check if user is logged in on component mount
  useEffect(() => {
    const user = getUserIdFromToken(localStorage.getItem('jwtToken'));        
       
    // const user = JSON.parse(localStorage.getItem('J')); // Retrieve user data
    if (user && user.id) {
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove user data from localStorage
    setIsLoggedIn(false); // Set state back to logged out
    navigate('/login'); // Redirect to login page
  };

   // Toggle dropdown visibility
   const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <header className="header bg-light py-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3 col-sm-6 col-6">
          <div className="container"><div className='row'>
            <div className="logo col-md-2">
              <img src={logo} alt="Genix Auctions Logo" className="img-fluid" />
            
            </div>
            <div className='col'>Genix Auctions</div>
            </div></div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <nav>
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <a href="/" className="nav-link">Auctions</a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">Bidding</a>
                </li>
                <li className="nav-item">
                  <a href="/about-us" className="nav-link">About Us</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-3 col-sm-6 col-6 text-right">
            <div className="auth-buttons">
            {isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                    type="button"
                    onClick={toggleDropdown} // Control dropdown toggle manually
                    aria-expanded={dropdownOpen ? 'true' : 'false'}
                  >
                    <CIcon icon={cilUser} size="sm" className="me-2" />
                    {userName}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu show" aria-labelledby="userMenu">
                      <li>
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item">Logout</button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary mr-2">Login</Link>
                  <Link to="/register" className="btn btn-primary">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
