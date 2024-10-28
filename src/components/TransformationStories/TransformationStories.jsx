import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import { Button, Card, CardContent, Typography, Container, Grid, Box } from '@mui/material';

const TransformationStories = () => {
  const items = [
    {
      id: 1,
      src: '1beff.jpg',
      altText: 'Before Image',
      caption: '“A fresh start with a new look!” - Amandi Fernando',
      afterSrc: '1aft.jpg'
    },
    {
      id: 2,
      src: '2beff.png',
      altText: 'Before Image',
      caption: '“I feel rejuvenated and confident!” - Samadhi Parindi ',
      afterSrc: '2aft.png'
    },
    {
      id: 3,
      src: '3beff.jpg',
      altText: 'Before Image',
      caption: '“A beautiful transformation for a new beginning!” - Elina SefnyS',
      afterSrc: '3aft.jpg'
    }
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.id}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={item.src} alt={item.altText} className="img-fluid" style={{ borderRadius: '10px', height: '490px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={item.afterSrc} alt={item.altText} className="img-fluid" style={{ borderRadius: '10px', height: '490px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
          <CarouselCaption
            captionText="Reviews"
            captionHeader={<Typography variant="body1" sx={{ color: '#f8f9fd', fontSize:'20px',display:'flex', justifyContent:'center' }}>{item.caption}</Typography>} 
          />
        </Grid>
      </Grid>
    </CarouselItem>
  ));

  return (
    <Box sx={{ py: 8, backgroundColor: '#e6d1c4' }}>
      <Container>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontFamily: 'sans-serif', color: '#2d2d2d' }}>
          Discover Real Stories of Transformation
        </Typography>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        <Grid container justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ backgroundColor: 'transparent', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontFamily: 'Georgia, serif', color: '#333', mb: 1 }}>
                  "Every Transformation Tells a Story"
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                  A radiant new look for a radiant new chapter in life.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#f9afa6', 
                    color: '#fff',
                    padding: '10px 20px',
                    ':hover': { backgroundColor: '#8d6e63' },
                  }}
                >
                  Your Transformation Awaits – Book a Consultation Today
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TransformationStories;
