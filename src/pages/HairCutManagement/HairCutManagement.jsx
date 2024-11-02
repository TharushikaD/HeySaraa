import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Button, Modal, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Container } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';

const HaircutManagement = () => {
    const [haircuts, setHaircuts] = useState([]);
    const [filteredHaircuts, setFilteredHaircuts] = useState([]);
    const [searchFaceShape, setSearchFaceShape] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentHaircut, setCurrentHaircut] = useState({ id: '', haircut_name: '', description: '', face_shape: '', image: null });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const apiUrl = 'http://localhost:5000/haircuts';
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchHaircuts();
    }, []);

    const fetchHaircuts = async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setHaircuts(response.data);
            setFilteredHaircuts(response.data); // Set filtered haircuts initially
        } catch (error) {
            console.error('Error fetching haircuts:', error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchFaceShape(value);
    
        // Filter haircuts based on the search input
        const filtered = haircuts.filter(haircut => 
            haircut.face_shape.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredHaircuts(filtered);
        console.log('Filtered Haircuts:', filtered); // Debugging line
    };

    const handleOpen = (haircut = {}) => {
        setCurrentHaircut(haircut);
        setIsEditing(!!haircut.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentHaircut({ id: '', haircut_name: '', description: '', face_shape: '', image: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentHaircut({ ...currentHaircut, [name]: value });
    };

    const handleFileChange = (e) => {
        setCurrentHaircut({ ...currentHaircut, image: e.target.files[0] });
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('face_shape', currentHaircut.face_shape);
        formData.append('haircut_name', currentHaircut.haircut_name);
        formData.append('description', currentHaircut.description);
        if (currentHaircut.image) formData.append('image', currentHaircut.image); // Ensure to use 'image'

        try {
            if (isEditing) {
                await axios.put(`${apiUrl}/${currentHaircut.id}`, formData, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(apiUrl, formData, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchHaircuts();
            handleClose();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving haircut:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchHaircuts();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting haircut:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', marginTop: '20px', marginBottom:'20px' }}>
                Haircut Management
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent:'center' }}>
                <TextField
                    label="Search by Face Shape"
                    variant="outlined"
                    value={searchFaceShape}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{ marginRight: '10px', width:'60%' }}
                    InputProps={{
                        endAdornment: (
                            <SearchIcon />
                        ),
                    }}
                />
            </Box>
            <Button variant="contained" onClick={() => handleOpen()} style={{ backgroundColor: '#555555', color: '#fff', marginBottom:'20px' }}>
                    Add Haircut
                </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Haircut Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Face Shape</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredHaircuts.map(haircut => (
                            <TableRow key={haircut.id}>
                                <TableCell>{haircut.haircut_name}</TableCell>
                                <TableCell>{haircut.description}</TableCell>
                                <TableCell>{haircut.face_shape}</TableCell>
                                <TableCell>
                                    {haircut.image_url ? (
                                        <img src={haircut.image_url} alt={haircut.haircut_name} width="50" onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} />
                                    ) : (
                                        <span>No Image Available</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button sx={{ color: '#555555' }} onClick={() => handleOpen(haircut)} startIcon={<EditIcon />}></Button>
                                    <Button color="secondary" onClick={() => handleDelete(haircut.id)} startIcon={<DeleteIcon />}></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        padding: 4,
                        bgcolor: 'white',
                        borderRadius: '16px',
                        boxShadow: 24,
                        outline: 'none',
                        width: { xs: '90%', sm: '400px' },
                    }}
                >
                    <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
                        {isEditing ? 'Edit Haircut' : 'Add Haircut'}
                    </Typography>
                    <TextField
                        margin="dense"
                        label="Haircut Name"
                        name="haircut_name"
                        fullWidth
                        value={currentHaircut.haircut_name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rows={3}
                        value={currentHaircut.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Face Shape"
                        name="face_shape"
                        fullWidth
                        value={currentHaircut.face_shape}
                        onChange={handleInputChange}
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} sx={{ color: '#555555' }}>
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Action completed successfully.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default HaircutManagement;
