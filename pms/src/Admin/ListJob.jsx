import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, Grid, makeStyles } from '@material-ui/core';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f5f5f5', // Light background color
    borderRadius: theme.spacing(2), // Rounded corners
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  icon: {
    fontSize: '4rem',
    color: theme.palette.primary.main,
  },
  title: {
    textAlign: 'center', // Center align the title text
  },
}));

const ListJob = () => {
  const classes = useStyles();
  const [jobDetails, setJobDetails] = useState({
    companyName: '',
    role: '',
    requirements: '',
    salary: '',
    applyLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/faculty/listJob', jobDetails);
      toast.success('Job listed successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error listing job. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <WorkOutlineIcon className={classes.icon} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title} gutterBottom>
              List a Job
            </Typography>
          </Grid>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Company Name"
            name="companyName"
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Role"
            name="role"
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Requirements"
            name="requirements"
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Salary"
            name="salary"
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Apply Link"
            name="applyLink"
            onChange={handleInputChange}
            required
          />
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
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default ListJob;
