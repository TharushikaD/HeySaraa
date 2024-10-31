import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SalonService from '../pages/SalonService/SalonService';
import Products from '../pages/Products/Products';
import EleganceAI from '../pages/EleganceAI/EleganceAI';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import CustomerDashboard from '../components/CustomerDashboard/CustomerDashboard';
import { useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'admin' && location.pathname !== '/adminDashboard') {
        navigate('/adminDashboard');
      } else if (userRole === 'customer' && location.pathname !== '/customerDashboard') {
        navigate('/customerDashboard');
      }
    }
  }, [isLoggedIn, userRole, location.pathname, navigate]);

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/adminDashboard/*" element={<AdminDashboard />} />
          <Route path="/customerDashboard/*" element={<CustomerDashboard />} />
          <Route path="*" element={<Navigate to={userRole === 'admin' ? '/adminDashboard' : '/customerDashboard'} />} />
        </Routes>
      ) : (
        <>
          <ResponsiveDrawer />
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/salonservice" element={<SalonService />} />
            <Route path="/products" element={<Products />} />
            <Route path="/eleganceAI" element={<EleganceAI />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;