import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Button, Modal, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Container } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ id: '', product_name: '', description: '', price: '', category: '', image: null });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const apiUrl = 'http://127.0.0.1:5000/products';
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(response.data.map(product => ({
                ...product,
                price: parseFloat(product.price) || 0, 
            })));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleOpen = (product = {}) => {
        setCurrentProduct(product);
        setIsEditing(!!product.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentProduct({ id: '', product_name: '', description: '', price: '', category: '', image: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('product_name', currentProduct.product_name);
        formData.append('description', currentProduct.description);
        formData.append('category', currentProduct.category);
        formData.append('price', currentProduct.price.toString()); 
        if (currentProduct.image) formData.append('image', currentProduct.image);

        try {
            if (isEditing) {
                await axios.put(`${apiUrl}/${currentProduct.id}`, formData, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(apiUrl, formData, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchProducts();
            handleClose();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProducts();
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom align="center" sx={{fontWeight:'bold', marginTop:'20px'}}>Product Management</Typography>
            <Button variant="contained" onClick={() => handleOpen()} style={{ marginBottom: '20px', backgroundColor:'#555555', color:'#fff' }}>
                Add Product
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.product_name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>LKR {product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    {product.image_url && <img src={product.image_url} alt={product.product_name} width="50" />}
                                </TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleOpen(product)} startIcon={<EditIcon />}>
                                    </Button>
                                    <Button color="secondary" onClick={() => handleDelete(product.id)} startIcon={<DeleteIcon />}>
                                    </Button>
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
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.02)', 
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
                        {isEditing ? 'Edit Product' : 'Add Product'}
                    </Typography>
                    <TextField
                        label="Product Name"
                        name="product_name"
                        value={currentProduct.product_name}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            style: { borderRadius: '10px' },
                        }}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={currentProduct.description}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            style: { borderRadius: '10px' },
                        }}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={currentProduct.price}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            style: { borderRadius: '10px' },
                        }}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={currentProduct.category}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            style: { borderRadius: '10px' },
                        }}
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ margin: '20px 0', padding: '5px' }}
                    />
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, borderRadius: '20px', width: '100%' ,backgroundColor:'#555555', color:'#fff'}}
                    >
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </Button>
                </Box>
            </Modal>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} message={isEditing ? "Product updated!" : "Product added!"} />
        </Container>
    );
};

export default ProductManagement;
