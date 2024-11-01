import React from 'react';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';

const ServiceDetail = ({ onClose }) => {
  const services = [
    {
      name: "Regular Cut",
      description: "A classic haircut tailored to your preference.",
      price: 600,
    },
    {
      name: "Scissor Cut",
      description: "A precision cut using scissors for a refined finish.",
      price: 2200,
    },
    {
      name: "AI Powered Cut",
      description: "An advanced haircut using AI technology for personalized styles.",
      price: 3000,
    },
  ];

  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 6,
          transition: '0.3s',
          background: 'linear-gradient(135deg, #e1bee7, #d1c4e9)',
          '&:hover': {
            boxShadow: 10,
          },
        }}
      >
        <CardContent>
          {services.map((service, index) => (
            <Box key={index} sx={{ marginBottom: 3, paddingBottom: 2 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                {service.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                {service.description}
              </Typography>
              <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                LKR {service.price}
              </Typography>
              <Divider sx={{ margin: '10px 0', backgroundColor: '#6a1b9a' }} />
            </Box>
          ))}
        </CardContent>
      </Card>

      <Button 
        variant="contained" 
        onClick={onClose} 
        sx={{
          marginTop: 3,
          borderRadius: 20,
          backgroundColor: '#555555',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#a05cc3',
          },
          padding: '10px 20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ServiceDetail;
