import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { Alert } from '../../components/Alert/Alert'; 

function Profile({ open, onClose }) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (userId) {
            setLoading(true);
            axios.get(`http://localhost:5000/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    Alert('Failed', 'Unable to fetch user data', 'error');
                })
                .finally(() => {
                    setLoading(false);
                    setFetching(false);
                });
        }
    }, []);

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
            return false;
        }
        if (password.length < 8) {
            setPasswordError(true);
            Alert('Failed', 'Password must be at least 8 characters long', 'error');
            return false;
        }
        setPasswordError(false);
        return true;
    };

    const handlePasswordChange = () => {
        if (!validatePasswords()) {
            return;
        }

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        setLoading(true);
        axios.put(`http://localhost:5000/users/${userId}`, { password }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                Alert('Success', 'Password changed successfully!', 'success');
                setPassword('');
                setConfirmPassword('');
            })
            .catch((error) => {
                console.error('Error changing password:', error);
                Alert('Failed', 'Something went wrong', 'error');
            })
            .finally(() => setLoading(false));
    };

    const handleUserDataUpdate = () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!token) {
            Alert('Failed', 'Authorization token is missing', 'error');
            return;
        }

        setUpdating(true);

        axios.put(`http://localhost:5000/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                Alert('Success', 'Profile updated successfully!', 'success');
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                Alert('Failed', error.response?.data?.message || 'Unable to update profile', 'error');
            })
            .finally(() => setUpdating(false));
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, maxWidth: 800, margin: 'auto', marginTop: 4 }}>
            {loading || fetching ? (
                <CircularProgress />
            ) : (
                <Box component="form" sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#992626' }}>
                        User Profile
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Name"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                variant="outlined"
                                InputProps={{ style: { borderRadius: 8 } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                variant="outlined"
                                InputProps={{ style: { borderRadius: 8 } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Role"
                                value={userData.role}
                                InputProps={{ readOnly: true, style: { borderRadius: 8 } }}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, backgroundColor: '#992626', '&:hover': { backgroundColor: '#b33d3d' } }}
                                onClick={handleUserDataUpdate}
                                disabled={updating}
                            >
                                Update Profile
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#992626', fontWeight: 'bold' }}>
                                Change Password
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                InputProps={{ style: { borderRadius: 8 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Confirm New Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={passwordError}
                                helperText={passwordError ? 'Passwords do not match or are invalid' : ''}
                                variant="outlined"
                                InputProps={{ style: { borderRadius: 8 } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, backgroundColor: '#992626', '&:hover': { backgroundColor: '#b33d3d' } }}
                                onClick={handlePasswordChange}
                                disabled={loading}
                            >
                                Update Password
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Paper>
    );
}

export default Profile;
