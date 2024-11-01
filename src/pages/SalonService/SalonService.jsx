import React from 'react'
import RoundICard from '../../components/roundimgcard/RoundICard'
import './style.css'
import axios from 'axios';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { useState, useEffect } from 'react';

export default function SalonService() {
  const [services, setServices] = useState([]);
  const API_URL = 'http://127.0.0.1:5000/services';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="container-fluid p-0">
      <img
        src='ser3.png'
        alt="carsoulimg"
        className="service img-fluid w-100"
      />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

    </div>
  )
}
