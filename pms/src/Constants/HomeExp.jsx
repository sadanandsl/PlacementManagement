import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, makeStyles, Container, List, ListItem, ListItemText, Divider, Paper } from '@material-ui/core';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  list: {
    width: '80%',
    maxWidth: 600,
  },
  listItem: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: theme.spacing(1),
  },
  totalRounds: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  rating: {
    fontWeight: 'bold',
  },
}));

const HomeExp = () => {
  const classes = useStyles();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/experiences');
        setExperiences(response.data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
    <Navbar />
    <Container component="div" maxWidth="md" className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Interview Experiences
      </Typography>
      <List className={classes.list}>
        {experiences.map((exp) => (
          <Paper elevation={3} key={exp._id} className={classes.listItem}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" className={classes.companyName}>
                    {exp.companyName}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1" className={classes.totalRounds}>
                      Total Rounds: {exp.totalRounds}
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                      Description: {exp.description}
                    </Typography>
                    <Typography variant="body1" className={classes.rating}>
                      Rating: {exp.rating}/5
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>

    </>
  );
};

export default HomeExp;
