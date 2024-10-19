import React from 'react';
import signinlanding from '../../images/signinlanding.PNG'
import { useNavigate } from 'react-router-dom';

const SuccessLanding = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login'); // Redirect to the login page
      };

  return (
    <div className="landing-page text-center">
      <img 
        src={signinlanding}
        alt="Success" 
        className="landing-image" 
      />
      <button onClick={handleLoginClick} className="btn btn-primary">
        Login Now
      </button>
    </div>
  );
};

export default SuccessLanding;
