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
      <Link color="inherit" href="http://localhost:5177/home">
        Hey Saraa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateForm = () => {
    let isValid = true;

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

  const loginAction = () => {
    if (!validateForm()) {
      return;
    }

    axios
      .post('http://127.0.0.1:5000/login', {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        const token = response.data.token; // Extract token from response
        localStorage.setItem('token', token); // Store token in localStorage
        Alert('Success', 'Signing In!', 'success');
        clearText();
      })
      .catch(function (error) {
        console.log(error);
        Alert('Failed', 'Something Went Wrong!', 'error');
      });
  };

  const clearText = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("public/car1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#992626', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#992626', fontWeight: '600' }}>
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                size='small'
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                helperText={emailError ? 'Invalid email format' : ''}
                onChange={(event) => setEmail(event.target.value)}
                InputProps={{
                  style: { borderRadius: '12px', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)' },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                size='small'
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError ? 'Password must be at least 6 characters' : ''}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{
                  style: { borderRadius: '12px', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)' },
                }}
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
                  borderRadius: '12px',
                  padding: '10px 20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
                onClick={loginAction}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: '#9b897d' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="http://localhost:5173/register" variant="body2" sx={{ color: '#9b897d' }}>
                    {"Don't have an account? Sign Up"}
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
