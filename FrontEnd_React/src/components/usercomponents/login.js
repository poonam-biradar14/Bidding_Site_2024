// GetStarted.js
import React, { useState } from 'react';
import './userregister.css'; 
import loginimg from '../../images/loginimg.PNG'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepsignedin: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');   
  const [invalidpwd, setinvalidpwd] = useState(false);   
  const [success, setSuccess] = useState(false);    
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
        const dataToSend = {
            email: formData.email,
            password: formData.password,
            // receiveEmails: formData.receiveEmails,
          };
      // API call to the backend
      const response = await axios.post('http://localhost:5000/api/users/login', dataToSend);
     
      if (response.status === 200) {
        console.log('token', response.data.token)
        localStorage.setItem('jwtToken',response.data.token);
        // Success response
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          receiveEmails: false,
        });
        navigate('/auctionlist')
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed. Please try again.');
      setinvalidpwd(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-started container py-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <p className="text-muted">
            Welcome back. Enter your credentials to access your account
          </p>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Registration successful!</div>}


          <form onSubmit={handleSubmit}>
           
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
             {invalidpwd ?  <small className="form-text text-danger">Please enter correct password</small> : null}
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                id="receiveEmails"
                name="receiveEmails"
                className="form-check-input"
                checked={formData.receiveEmails}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="receiveEmails">
                Keep me signed in
              </label>
            </div>

            <button type="submit" className="btn btn-primary submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Continue'}
        </button>

            <div className="mt-3 text-center">
              <p>----------------or sign up with------------</p>
              <div className="social-buttons">
                <button type="button" className="btn btn-outline-secondary mr-2">
                  <i className="fab fa-google"></i> Google
                </button>
                <button type="button" className="btn btn-outline-secondary mr-2">
                  <i className="fab fa-apple"></i> Apple
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  <i className="fab fa-facebook"></i> Facebook
                </button>
              </div>
            </div>
          </form>

          <div className="mt-4">
            <p>Don't have an account?</p>
            <a href="/auction-rules" className="text-muted">Sign up here</a>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block">
          <img
            src={loginimg}
            alt="Illustration"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
