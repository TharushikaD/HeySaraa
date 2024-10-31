import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '../../components/Alert/Alert'; 
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { 
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon sx={{color:'#8d6e63'}} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon sx={{color:'#4c4541'}} />
          </IconButton>
        </Box>
      ),
    },
  ];

 
const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:5000/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, 
    });

    if (response.status === 200) {
     
      setData((prevData) => prevData.filter((user) => user.id !== id));
      Alert('Success', 'User Deleted Successfully!', 'success');
    } else {
      Alert('Error', 'Failed to delete user. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error deleting user:', error);

   
    const errorMessage =
      error.response && error.response.status === 404
        ? 'User not found.'
        : 'Something went wrong while deleting the user.';

    Alert('Oops...', errorMessage, 'error');
  }
};


  const handleEdit = (id) => {
    Alert('Edit User', `Edit user with ID: ${id}`, 'info');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/users/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersArray = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));
        setData(usersArray);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ height: 900, width: '100%', p: 2 }}>
      <Typography variant="h6" style={{
        marginBottom:'20px'
      }}>
        Users List
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </Paper>
  );
}
