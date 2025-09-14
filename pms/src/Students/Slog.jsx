 // components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  form: {
    width: '100%',
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

const Slog = () => {
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
        navigate('/student/home');
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
      <Paper elevation={3} className={classes.paper}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
          Student Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Reg Num"
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
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor:"#42A5F5"}}
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </Paper>
      <ToastContainer /> {/* Add this line to render the ToastContainer */}
    </Container>
  );
};

export default Slog;
