import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from '../../components/Alert/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5174/home">
        Hey Saraa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (name.trim() === '') {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  };

  const registerAction = () => {
    if (!validateForm()) {
      return;
    }

    axios
      .post('http://127.0.0.1:5000/register', {
        name: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        Alert('Success', 'User Signed Up Successfully!', 'success');
        clearText();
      })
      .catch(function (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        Alert('Registration Failed', 'There was an error during registration.', 'error');
      });
  };

  const clearText = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '78vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("public/girl.jpeg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#992626' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#992626', fontWeight: '600' }}>
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                error={nameError}
                helperText={nameError ? 'Name is required' : ''}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                helperText={emailError ? 'Invalid email format' : ''}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError ? 'Password must be at least 6 characters' : ''}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
                sx={{ color: '#992626' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#d89685',
                  '&:hover': {
                    backgroundColor: '#992626',
                  },
                }}
                onClick={registerAction}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:5173/login" variant="body2" sx={{ color: '#9b897d' }}>
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5, color: '#9b897d' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
