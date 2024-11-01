import React from 'react';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';

const FacialDetails = ({ onClose }) => {
  const services = [
    {
      name: "Deep Pore Cleansing",
      description: "A classic haircut tailored to your preference.",
      price: 600,
    },
    {
      name: "Acne Problem Facial",
      description: "Specifically formulated for acne-prone skin, this facial targets acne lesions and helps to reduce inflammation. It includes gentle cleansing, exfoliation, and specialized products that balance oil production while calming irritated skin. Regular treatments can improve overall skin texture and appearance This treatment includes exfoliation, steaming, extraction of blackheads, and a soothing mask to rejuvenate the skin",
      price:3500,
    },
    {
      name: "Glycolic Peel Facial",
      description: " A rejuvenating facial that uses glycolic acid to exfoliate the outer layer of dead skin cells, promoting cell turnover and revealing fresher, more radiant skin. This treatment helps reduce fine lines, uneven skin tone, and signs of aging. It also minimizes the appearance of pores and enhances the overall texture of the skin",
      price: 4000,
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

export default FacialDetails;
