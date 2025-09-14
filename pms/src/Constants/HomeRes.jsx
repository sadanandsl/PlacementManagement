import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
  Button,
} from '@material-ui/core';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  downloadButton: {
    marginTop: theme.spacing(2),
  },
}));

const HomeRes = () => {
  const classes = useStyles();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/faculty/getResources');
        setResources(response.data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    };

    fetchResources();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const convertUint8ArrayToBase64 = (uint8Array) => {
    const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binaryString);
  };

  return (
    <>
    <Navbar />
    <Container component="div" maxWidth="md" className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Resources List
      </Typography>
      <List>
        {resources.map((resource) => (
          <Card className={classes.card} key={resource._id}>
            <CardContent>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primary={`Company Name: ${resource.companyName}`}
                  secondary={`Scope of Resource: ${resource.scopeOfResource}`}
                />
                {resource.pdfFile && (
                  <div>
                    <Typography variant="body2">PDF File:</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.downloadButton}
                      href={`data:application/pdf;base64,${convertUint8ArrayToBase64(
                        new Uint8Array(resource.pdfFile.data)
                      )}`}
                      download={`${resource.companyName}_${resource.scopeOfResource}.pdf`}
                    >
                      Download PDF
                    </Button>
                  </div>
                )}
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
    </>
  );
};

export default HomeRes;
