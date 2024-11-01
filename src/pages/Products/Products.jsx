import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
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
      const formattedProducts = response.data.map(product => ({
        ...product,
        price: parseFloat(product.price) || 0 
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesName = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = product.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesName && (categoryFilter === '' || matchesCategory);
  });

  return (
    <div className="container-fluid p-0">
      <img
        src='pro.png'
        alt="Carousel Image"
        className="service img-fluid w-100"
      />
      <Container>
        <Box sx={{ padding: 4 }}>
          <Row className="mb-4">
            <Col xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search by Name"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  style: { borderRadius: '20px', backgroundColor: '#f8f8f8' }
                }}
              />
            </Col>
            <Col xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Filter by Category"
                value={categoryFilter}
                onChange={handleCategoryChange}
                InputProps={{
                  style: { borderRadius: '20px', backgroundColor: '#f8f8f8' }
                }}
              />
            </Col>
          </Row>
          <Typography variant="h6" gutterBottom align="center" color="#555" style={{marginBottom:'20px'}}>Available Products</Typography>
          <Row>
            {filteredProducts.map(product => (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
                <Card className="shadow-lg" style={{
                  borderRadius: '15px', 
                  height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url}
                    alt={product.product_name}
                    style={{ objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                  />
                  <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px' }}>
                    <Typography variant="h6" fontWeight="bold" color="#333">{product.product_name}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                    <Typography variant="h6" style={{ marginTop: '10px', color: '#333' }}>
                      LKR {product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Category: {product.category}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button size="small" variant="contained" color="secondary" style={{ borderRadius: '20px', textTransform: 'none',backgroundColor: '#f9afa6' , marginBottom:'5px'}}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Col>
            ))}
          </Row>
        </Box>
      </Container>
    </div>
  );
};

export default Products;
