
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/common/header';
import Footer from './components/common/footer';
import MainLayout from './components/layout/mainlayout';
import UserRegister from './components/usercomponents/userregister';
import SuccessLanding from './components/usercomponents/successLanding';
import Login from './components/usercomponents/login';
import AuctionContainer from './components/auctions/auctioncontainer';
import AuctionDetail from './components/auctions/biditem';

const App = () => {
  return (
    <Router>
      <div>
        <Header />  {/* The header will be displayed on all pages */}
        <Routes>
          <Route path="/" element={<MainLayout />} />   {/* Main Home page */}
          <Route path="/register" element={<UserRegister />} />  {/* User registration page */}
          <Route path="/signinlanding" element={<SuccessLanding />} />  {/* User registration page */}
          <Route path="/login" element={<Login />} />  {/* User registration page */}
          <Route path="/auctionlist" element={<AuctionContainer/>}/>
          <Route path="/auction/:auctionId" element={<AuctionDetail />} />
        </Routes>
        <Footer />  {/* The footer will be displayed on all pages */}
      </div>
    </Router>
  );
};

export default App;
