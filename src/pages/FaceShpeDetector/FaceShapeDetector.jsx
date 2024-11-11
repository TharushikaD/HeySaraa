import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Button,
    Paper,
    Grid,
    Snackbar,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const FaceShapeDetector = () => {
    const [image, setImage] = useState(null);
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [detectedFaceShape, setDetectedFaceShape] = useState('');
    const [confidence, setConfidence] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [haircuts, setHaircuts] = useState([]); 
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error("Error accessing the camera: ", err);
            });
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        const byteString = atob(imageData.split(',')[1]);
        const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        setImage(blob);
        setImageDataUrl(imageData);
    };

    // const detectFaceShape = async () => {
    //     if (!image) return;

    //     const formData = new FormData();
    //     formData.append('image', image);

    //     try {
    //         const response = await axios.post('http://127.0.0.1:5000/detect-face-shape', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         const { detected_face_shape, confidence } = response.data;
    //         setDetectedFaceShape(detected_face_shape);
    //         setConfidence(confidence.toFixed(2));

    //         // Step 2: Fetch haircuts for the detected face shape
    //         const haircutsResponse = await axios.get(`http://127.0.0.1:5000/haircuts?face_shape=${detected_face_shape}`);
    //         setHaircuts(haircutsResponse.data); // Store fetched haircuts in state

    //     } catch (error) {
    //         console.error("Error detecting face shape: ", error);
    //         setOpenSnackbar(true);
    //     }
    // };

    // const handleCloseSnackbar = () => {
    //     setOpenSnackbar(false);
    // };

    const detectFaceShape = async () => {
        if (!image) return;
    
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/detect-face-shape', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const { detected_face_shape, confidence } = response.data;
            setDetectedFaceShape(detected_face_shape);
            setConfidence(confidence.toFixed(2));
    
            const haircutsResponse = await axios.get(`http://127.0.0.1:5000/haircutss?face_shape=${detected_face_shape}`);
            setHaircuts(haircutsResponse.data); 
    
        } catch (error) {
            console.error("Error detecting face shape: ", error);
            setOpenSnackbar(true);
        }
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    

    return (
        <Container maxWidth="md">
            <Paper elevation={6} style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '16px' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
                    Face Shape Detector
                </Typography>
                <Button variant="contained" onClick={startCamera} style={{ margin: '10px', borderRadius: '20px', backgroundColor:'#555555', color:'#fff' }}>
                    Start Camera
                </Button>
                <div>
                    <video
                        ref={videoRef}
                        width="400"
                        height="300"
                        style={{ display: 'block', margin: '20px auto', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                    <canvas ref={canvasRef} width="400" height="300" style={{ display: 'none' }} />
                </div>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button variant="contained"  onClick={captureImage} style={{ borderRadius: '20px', backgroundColor:'#f9afa6', color:'#fff' }}>
                            Capture Image
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained"  onClick={detectFaceShape} style={{ borderRadius: '20px',backgroundColor:'#f9afa6',color:'#fff' }}>
                            Detect Face Shape
                        </Button>
                    </Grid>
                </Grid>
                {imageDataUrl && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6" style={{ marginBottom: '10px' }}>Captured Image:</Typography>
                        <img src={imageDataUrl} alt="Captured" style={{ width: '400px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '10px' }} />
                    </div>
                )}
                {detectedFaceShape && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6" style={{ color: '#555' }}>Detected Face Shape: <strong>{detectedFaceShape}</strong></Typography>
                        <Typography variant="body1" style={{ color: '#777' }}>Confidence: {confidence}</Typography>
                    </div>
                )}

                {haircuts.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h5">Recommended Haircuts:</Typography>
                        <Grid container spacing={2}>
                            {haircuts.map(haircut => (
                                <Grid item xs={12} sm={6} md={4} key={haircut.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt={haircut.haircut_name}
                                            height="140"
                                            image={haircut.image_url}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {haircut.haircut_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {haircut.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </Paper>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Error detecting face shape!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default FaceShapeDetector;

