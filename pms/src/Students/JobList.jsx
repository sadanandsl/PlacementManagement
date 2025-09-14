import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, makeStyles, Container, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: theme.spacing(1),
  },
  role: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  requirements: {
    marginBottom: theme.spacing(1),
  },
  salary: {
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: theme.spacing(1),
  },
}));

const JobList = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleClickOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/jobs/${selectedJob._id}`);
      setJobs(jobs.filter((job) => job._id !== selectedJob._id));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="div" maxWidth="md" className={classes.root} disableGutters>
      <Typography variant="h4" className={classes.heading}>
        Jobs List
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} key={job._id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.companyName}>{job.companyName}</Typography>
                <Typography className={classes.role}>
                  Role: {job.role}
                </Typography>
                <Typography className={classes.requirements}>
                  Requirements: {job.requirements}
                </Typography>
                <Typography className={classes.salary}>
                  Salary: {job.salary}
                </Typography>
                <Typography>
                  Apply Link: <a href={job.applyLink} target="_blank" rel="noopener noreferrer">{job.applyLink}</a>
                </Typography>
                {/* <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.deleteButton}
                  onClick={() => handleClickOpen(job)}
                >
                  Delete Job
                </Button> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobList;
