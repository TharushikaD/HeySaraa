import React, { useState } from 'react';
import { Button, Typography, Container, Box, Modal,Grid, Divider, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import 'bootstrap/dist/css/bootstrap.min.css';

const faceShapes = [
  {
    title: "Oval Face",
    description: "The oval face is considered the ideal shape, characterized by balanced proportions. Most hairstyles work well, but long layers and soft waves are particularly flattering.",
    image: "oval.png",
  },
  {
    title: "Round Face",
    description: "A round face has soft angles and a wide appearance. To elongate the face, styles that add height such as layered cuts and high ponytails are ideal.",
    image: "round.png",
  },
  {
    title: "Square Face",
    description: "Characterized by strong jawlines and angular features, the square face shape looks great with soft, layered hairstyles that create softness and roundness.",
    image: "square.png",
  },
  {
    title: "Heart Face",
    description: "A heart face shape has a narrow forehead and a wide jawline. Styles that add volume at the forehead or soften the jawline are ideal. Side-swept bangs and layered cuts help to create balance.",
    image: "heart.png",
  },
];

export default function EleganceAI() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFaceShape, setSelectedFaceShape] = useState(null);

  const handleOpen = (faceShape) => {
    setSelectedFaceShape(faceShape);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFaceShape(null);
  };

  return (
    <div className="container-fluid p-0">
      <img src='ai.png' alt="carouselimg" className="service img-fluid w-100" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, marginTop: -3 }}>
        <Box
          sx={{
            backgroundColor: '#e6d1c4',
            borderRadius: 4,
            padding: 4,
            boxShadow: 6,
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          <Typography variant="h6" paragraph sx={{ color: '#34495e', marginBottom: 3 }}>
            Discover personalized hairstyle suggestions tailored to your unique facial structure.
            Sign up or log in to unlock the full potential of our AI-powered styling assistant.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/register"
            sx={{
              marginRight: 2,
              backgroundColor: '#414141',
              '&:hover': { backgroundColor: '#cb6ce6' },
              borderRadius: 20,
              paddingX: 4,
            }}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="/login"
            sx={{
              borderColor: '#ff66c4',
              color: '#ff66c4',
              '&:hover': { borderColor: '#cb6ce6', color: '#cb6ce6' },
              borderRadius: 20,
              paddingX: 4,
            }}
          >
            Login
          </Button>
        </Box>

        <Box
          sx={{
            padding: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            marginTop: '10px',
            maxHeight: '400px',
            overflowX: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Understanding Face Shapes
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#34495e', marginBottom: 2 }}>
            Your face shape plays a crucial role in determining the most flattering hairstyles for you.
            At Elegance AI, we analyze your facial features to suggest hairstyles that enhance your natural beauty.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', marginTop: 2 }}>
            {faceShapes.map((faceShape, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: '200px',
                  margin: 1,
                  padding: 8,
                  border: '1px solid #bdc3c7',
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                  boxShadow: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  backgroundImage: `url(${faceShape.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleOpen(faceShape)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: 1,
                    padding: 1,
                    textAlign: 'center',
                  }}
                >
                  {faceShape.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Modal open={openModal} onClose={handleClose}>
          <Box
            sx={{
              bgcolor: '#f7f8fa',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              p: 4,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '70%', md: '50%' },
              maxHeight: '85vh',
              overflowY: 'auto',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#a1a1a1',
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedFaceShape && (
              <>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <img
                      src={selectedFaceShape.image}
                      alt={selectedFaceShape.title}
                      style={{
                        width: '100%',
                        borderRadius: '12px',
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                      className="face-image"
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: '#1c2938', textAlign: { xs: 'center', md: 'left' } }}
                    >
                      {selectedFaceShape.title}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: '#525f75', lineHeight: 1.7 }}>
                      {selectedFaceShape.description}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3, bgcolor: '#d1d5db' }} />

                <Typography variant="h6" sx={{ color: '#1c2938', fontWeight: 600, mb: 1 }}>
                  Styling Tips for {selectedFaceShape.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#525f75', lineHeight: 1.7 }}>
                  {selectedFaceShape.title === "Oval Face" && (
                    <>
                      Embrace a versatile range of hairstyles to enhance your balanced features:
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Soft waves and long layers add graceful framing.</li>
                        <li>Middle parts bring elegance, while updos highlight your cheekbones.</li>
                      </ul>
                    </>
                  )}
                  {selectedFaceShape.title === "Round Face" && (
                    <>
                      Create length and height with hairstyles that shape and slim:
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Layers starting below the chin are ideal.</li>
                        <li>Soft waves at longer lengths offer a gentle contour.</li>
                        <li>High buns and ponytails bring in length.</li>
                      </ul>
                    </>
                  )}
                  {selectedFaceShape.title === "Square Face" && (
                    <>
                      Choose styles that soften your jawline with added movement:
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Side-swept bangs or jawline waves enhance elegance.</li>
                        <li>Soft, layered cuts balance your angular features.</li>
                      </ul>
                    </>
                  )}
                  {selectedFaceShape.title === "Heart Face" && (
                    <>
                      Add fullness around the jawline with carefully placed layers:
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Side parts create symmetry and balance.</li>
                        <li>Chin-length bobs or shoulder-length cuts are ideal for volume.</li>
                      </ul>
                    </>
                  )}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </div>
  );
}
