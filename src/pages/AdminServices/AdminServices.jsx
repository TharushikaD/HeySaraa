import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [updateService, setUpdateService] = useState(null);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const API_URL = 'http://127.0.0.1:5000/services';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services.');
      setOpenSnackbar(true);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(API_URL, newService, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
      setNewService({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding service:', error);
      setError('Failed to add service.');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!updateService) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/${updateService.id}`, updateService, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
      setUpdateService(null);
    } catch (error) {
      console.error('Error updating service:', error);
      setError('Failed to update service.');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      setError('Failed to delete service.');
      setOpenSnackbar(true);
    }
  };

  const handleEditService = (service) => {
    setUpdateService({ ...service });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (updateService) {
      setUpdateService((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewService((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography sx={{ fontWeight: 'bold', color: '#333', fontSize:'30px' }}>
          Manage Services
        </Typography>
      </Box>

      <form onSubmit={updateService ? handleUpdateService : handleAddService} style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <TextField
          label="Service Name"
          name="name"
          value={updateService ? updateService.name : newService.name}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={updateService ? updateService.description : newService.description}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          multiline
          rows={1} 
        />
        <TextField
          label="Price (LKR)" 
          name="price"
          type="number"
          value={updateService ? updateService.price : newService.price}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color={updateService ? 'secondary' : 'primary'} type="submit" sx={{ height: '50px', minWidth: '150px' }}>
          {updateService ? 'Update Service' : 'Add Service'}
        </Button>
      </form>

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Service Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Description</TableCell >
              <TableCell sx={{ fontWeight: 'bold' }}>Price (LKR)</TableCell> 
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id} hover>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>LKR {service.price}</TableCell> 
                <TableCell>
                  <IconButton onClick={() => handleEditService(service)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteService(service.id)} color="error">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default AdminServices;
