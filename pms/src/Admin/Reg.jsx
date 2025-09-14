// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Typography, Container, Grid, Avatar, CssBaseline, Link, makeStyles } from '@material-ui/core';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
// import { useNavigate } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(4),
//   },
//   paper: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: theme.spacing(3),
//     background: '#ffffff',
//     borderRadius: theme.spacing(2),
//     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.primary.main,
//   },
//   form: {
//     width: '100%',  
//     marginTop: theme.spacing(1),
//   },
//   submitButton: {
//     margin: theme.spacing(3, 0, 2),
//     background: theme.palette.primary.main,
//     '&:hover': {
//       background: theme.palette.primary.dark,
//     },
//   },
// }));

// const Reg = () => {
//   const classes = useStyles();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/register', { username, email, password });
//       console.log(response.data);

//       if (response.data.success) {
//         toast.success('Registration successful!');
//         navigate('/studLog');
//       } else {
//         toast.error('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Registration failed', error);
//       toast.error('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" className={classes.root}>
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
// Add Student        </Typography>
//         <form className={classes.form}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             id="username"
//             label="Reg Num"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             name="password"
//             label="Mobile Number"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submitButton}
//             onClick={handleRegister}
//           >
// Add Student          </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link href="/studLog" variant="body2">
//                 Already have an account? Log in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </Container>
//   );
// };

// export default Reg;


import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid, Avatar, CssBaseline, Link, makeStyles } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    background: '#ffffff',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));

const Reg = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regex for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    // Regex to ensure the password is exactly 10 digits
    const passwordRegex = /^\d{10}$/;
    return passwordRegex.test(password);
  };


  const handleRegister = async () => {
    // Simple validation to check if all fields are filled
    if (!username || !email || !password) {
      toast.error('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    if (!validatePassword(password)) {
      toast.error('Mobile No must be exactly 10 digits.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/register', { username, email, password });
      console.log(response.data);

      if (response.data.success) {
        toast.success('Registration successful!');
        navigate('/studLog');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Student
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Reg Num"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // This makes the field mandatory
          />
          <TextField
           variant="outlined"
           margin="normal"
           fullWidth
           id="email"
           label="Email Address"
           name="email"
           autoComplete="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
          />
          <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="password"
        label="Mobile Number"
        type="tel" // Changed to tel to indicate a phone number
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{ maxLength: 10, pattern: "[0-9]*" }} // Restrict to numbers and max length of 10
        required // This makes the field mandatory
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={handleRegister}
          >
            Add Student
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/studLog" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Reg;
