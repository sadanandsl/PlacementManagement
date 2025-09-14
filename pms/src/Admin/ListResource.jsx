import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, Grid, makeStyles } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
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

const ListResource = () => {
  const classes = useStyles();
  const [resourceDetails, setResourceDetails] = useState({
    companyName: '',
    scopeOfResource: '',
    pdfFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const file = name === 'pdfFile' ? files[0] : null;

    setResourceDetails({ ...resourceDetails, [name]: file || value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('companyName', resourceDetails.companyName);
      formData.append('scopeOfResource', resourceDetails.scopeOfResource);
      formData.append('pdfFile', resourceDetails.pdfFile);

      await axios.post('http://localhost:3001/api/faculty/listResource', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Resource listed successfully!');
      setResourceDetails({
        companyName: '',
        scopeOfResource: '',
        pdfFile: null,
      });

      // Clear file input
      document.getElementById('pdfFileInput').value = '';
    } catch (error) {
      console.error(error);
      toast.error('Error listing resource. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <InsertDriveFileIcon className={classes.icon} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title} gutterBottom>
              List a Resource
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
            value={resourceDetails.companyName}
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Scope of Resource"
            name="scopeOfResource"
            value={resourceDetails.scopeOfResource}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            id="pdfFileInput"
            name="pdfFile"
            onChange={handleInputChange}
            accept=".pdf"
            className={classes.textField}
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

export default ListResource;
