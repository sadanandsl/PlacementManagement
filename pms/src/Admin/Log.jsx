// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo1.png'
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Center vertically
      minHeight: '100vh', // Make sure the container takes at least the full height of the viewport
    },
    paper: {
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    logo: {
      width: '100px',
      marginBottom: theme.spacing(2),
    },
  }));
  
const Log = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      console.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });

      if (response.data.success) {
        // Login successful, navigate to the desired route
        navigate('/admin/dashboard');
      } else {
        // Login failed, display toaster message
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('An error occurred during login');
    }
  };


  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      {/* Placeholder for the logo */}

      <Paper elevation={3} className={classes.paper}>
      <ToastContainer /> 
      <img src={logo} alt="Logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
         Admin Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            style={{backgroundColor:"#42A5F5"}}
            className={classes.submit}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Log;
