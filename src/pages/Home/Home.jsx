import React from 'react'
import './style.css'
import RoundICard from '../../components/roundimgcard/RoundICard'
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function Home() {

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.container-2');
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (sectionPosition < screenPosition) {
        setFadeIn(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="container-fluid p-0">
      <img
        src="1.png"
        alt="carsoulimg"
        className="img-fluid w-100"
      />
      <div style={{display:'flex', justifyContent:'center'}}>
        <div className={`container-2 ${fadeIn ? 'fade-in' : ''}`}>
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12 text-center mb-2">
              <img
                src="owner.png"
                alt="Owner - Sarangi Warnakulasooriya"
                className="img-fluid owner-image shadow-sm"
              />
            </div>
            <div className="col-md-6 col-sm-12 all-description text-center text-md-start">
              <h2 className="section-title">Meet the Owner</h2>
              <h1 className="owner-name">Sarangi Warnakulasooriya</h1>
              <p className="owner-description">
                Welcome to our salon, a sanctuary of beauty and relaxation nestled in the heart of Kandy.
                I am Sarangi, with over 8 years of experience in the beauty industry.
                My passion is to help individuals express their unique beauty and boost their confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='caption'>
        <RoundICard
          title="EXPERTISE AREAS"
          description="Alow body,mind and soul to sense a haven of tranqulity "

        />
      </div>
      <div className="container-3">
        <video autoPlay loop muted className="background-video">
          <source src='vid.mp4' type='video/mp4' />
        </video>
        <div className='content'>
          <RoundICard
            src={'customer1.png'}
            title="Professional Service"
            description="Offers experts advices and recommendations"
          />
          <RoundICard
            src={'hygine.png'}
            title="Hygiene & Sanitation"
            description="Use proper sterilization of tools and equipments and clean workspace"
          />
          <RoundICard
            src={'cut.png'}
            title="Modern Hair Design"
            description="Up-to-date latest trends and techniques"
          />
        </div>
      </div>
      <div className="container-4">
        <Card style={{ width: '50%', border: 'none' }}>
          <Card.Body>
            <Card.Title style={{ marginTop: '60px', marginBottom: '10px', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: '400', color: '#8a5e4d' }}>RESERVATION / CONTACT</Card.Title>
            <hr style={{ color: '#992626', width: '45%', display: 'flex', justifyContent: 'center', margin: '0 auto' }} />
            <Card.Text style={{ color: '#992626', marginBottom: '20px', textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>get in touch with us</Card.Text>
            <div className="location">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0862607525723!2d80.67374930985238!3d7.344210113053244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae35d8c387a8acf%3A0x7eebc7ac326e6a44!2sSalon%20Hey%20Sara%20Bake%20%26%20Cakes!5e0!3m2!1sen!2slk!4v1720252541152!5m2!1sen!2slk"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon Location"
              ></iframe>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className='footer'>
        <div className='footer-content'>
          <RoundICard
            title="Location"
            description="40/A Meegammana Road, Wattegama, Sri Lanka"
          />
          <RoundICard
            title="Mail us"
            description="warnakulasooriya@gmail.com"
          />
          <RoundICard
            title="Call us"
            description="076 931 7994"
          />
        </div>
      </div>
    </div >

  )
}
