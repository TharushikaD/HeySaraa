import React from 'react'
import './style.css'
import RoundICard from '../../components/roundimgcard/RoundICard'
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Grid, Typography, Container } from '@mui/material';
import TransformationStories from '../../components/TransformationStories/TransformationStories';
import MeetOwner from '../../components/MeetOwner/MeetOwner';


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
      <img src="1.png" alt="carsoulimg" className="img-fluid w-100" />
      <MeetOwner />
      <TransformationStories />
      <div className='caption'>
        <RoundICard
          title="EXPERTISE AREAS"
          description="Allow body, mind, and soul to sense a haven of tranquility"
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
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box
          sx={{
            p: 5,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box component="img" src="ele.jpg" alt="Elegance AI" sx={{ width: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Discover Your Perfect Look with <span style={{ color: '#f9afa6' }}>Elegance AI</span>
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a4a4a', mb: 3, lineHeight: 1.7 }}>
                Powered by advanced facial recognition technology, Elegance AI brings you personalized hairstyle suggestions to enhance your unique features. With just a snapshot, receive tailored recommendations for the styles that suit you best.
              </Typography>
              <Button
                variant="contained"
                href='/eleganceAi'
                color="primary"
                size="large"
                sx={{ mt: 2, backgroundColor: '#f9afa6', '&:hover': { backgroundColor: '#8d6e63' }, px: 4 }}
              >
                Try Elegance AI Now
              </Button>
            </Grid>
          </Grid>
        </Box>
        <div className="container-4">
          <Card style={{ width: '50%', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ marginTop: '60px', marginBottom: '10px', display: 'flex', justifyContent: 'center', fontSize: '25px', fontWeight: '400', color: '#333' }}>RESERVATION / CONTACT</Card.Title>
              <hr style={{ color: '#333', width: '45%', display: 'flex', justifyContent: 'center', margin: '0 auto' }} />
              <Card.Text style={{ color: '#333', marginBottom: '20px', textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Get in touch with us</Card.Text>
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
      </Container>

      <div className='footer'>
        <div className='footer-content'>
          <RoundICard title="Location" description="40/A Meegammana Road, Wattegama, Sri Lanka" />
          <RoundICard title="Mail us" description="warnakulasooriya@gmail.com" />
          <RoundICard title="Call us" description="076 931 7994" />
        </div>
      </div>
    </div>
  )
}
