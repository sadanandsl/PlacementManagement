import React from 'react';
import { Button, Card, CardContent, Container, Typography, Grid, makeStyles } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School'; // Icon for Student Login
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'; // Icon for Admin Login
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Import your logo image

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  logo: {
    height: '200px',
    width: '350px', // Adjust the width as needed
    marginBottom: theme.spacing(4),
  },
  card: {
    width: '100%',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: theme.spacing(3),
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();

  const loginOptions = [
    { label: 'Student Login', icon: <SchoolIcon />, link: '/studLog' },
    { label: 'Admin Login', icon: <SupervisorAccountIcon />, link: '/log' },
  ];

  return (
    <Container component="main" maxWidth="xl" className={classes.root}>
      <img src={Logo} alt="Logo" className={classes.logo} />
      
      <Typography variant="h4" gutterBottom>
        <b></b>
      </Typography>

      <Grid container spacing={2}>
        {loginOptions.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card className={classes.card}>
              <CardContent>
                <Link to={option.link} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    style={{backgroundColor:"#42A5F5"}}
                    className={classes.button}
                    startIcon={option.icon}
                  >
                    {option.label}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
