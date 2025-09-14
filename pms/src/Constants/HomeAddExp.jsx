import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    padding: theme.spacing(4),
    background: '#ffffff', // White background color
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow for a lifted effect
  },
  form: {
    width: '100%', // Full width
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(3),
    background: theme.palette.primary.main,
    color: '#ffffff', // White text color
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));

const HomeAddExp = () => {
  const classes = useStyles();
  const [experience, setExperience] = useState({
    companyName: '',
    totalRounds: '',
    description: '',
    rating: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/experiences', experience);
      toast.success('Interview experience submitted successfully!');
      // Optionally, you can redirect or perform other actions after successful submission.
    } catch (error) {
      console.error(error);
      toast.error('Error submitting interview experience. Please try again.');
    }
  };

  return (
    <>
<Navbar />
<Container component="div" maxWidth="sm" className={classes.root}>
      <div className={classes.formContainer}>
        <Typography variant="h5" gutterBottom>
          Submit Interview Experience
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Company Name"
                name="companyName"
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Total Rounds"
                name="totalRounds"
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Rating (out of 5)"
                name="rating"
                type="number"
                inputProps={{ min: '1', max: '5' }}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
    </>
  );
};

export default HomeAddExp;
