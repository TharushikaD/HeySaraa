import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import ServiceDetail from '../ServiceDetail/ServiceDetail';

const ServiceCard = ({ service }) => {
  const [openDetail, setOpenDetail] = useState(false);

  const handleViewClick = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <Card
        style={{
          margin: '20px',
          width: '320px',
          borderRadius: '18px',
          boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0px 8px 30px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0px 6px 25px rgba(0, 0, 0, 0.15)';
        }}
      >
        <div
          style={{
            height: '160px',
            background: 'linear-gradient(135deg, #e1bee7, #d1c4e9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6a1b9a',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
         {service.name}
        </div>
        <CardContent style={{ padding: '24px' }}>

          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: '20px', color: '#616161' }}
          >
            {service.description}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            style={{ fontWeight: '200', color: '#424242' }}
          >
            LKR {service.price}{' '}
            <span style={{ fontSize: '14px', color: '#757575' }}>upwards</span>
          </Typography>
        </CardContent>
        <CardActions style={{ padding: '0 24px 24px' }}>
          <Button
            size="small"
            variant="contained"
            style={{
              borderRadius: '10px',
              backgroundColor: '#8e24aa',
              color: '#fff',
              padding: '8px 16px',
              fontWeight: '500',
              boxShadow: 'none',
            }}
            onClick={handleViewClick}
          >
            More
          </Button>
        </CardActions>
      </Card>

      {openDetail && (
        <ServiceDetail service={service} onClose={handleCloseDetail} />
      )}
    </>
  );
};

export default ServiceCard;
