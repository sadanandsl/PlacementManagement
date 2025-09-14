const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');   
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/placementManagement', { useNewUrlParser: true, useUnifiedTopology: true });

const Job = mongoose.model('Job', {
  companyName: String,
  role: String,
  requirements: String,
  salary: String,
  applyLink: String,
});

const Resource = mongoose.model('Resource', {
  companyName: String,
  scopeOfResource: String,
  pdfFile: Buffer,
});

const Admin = mongoose.model('Admin', {
  username: String,
  password: String,
});

const Experience = mongoose.model('Experience', {
  companyName: String,
  totalRounds: String,
  description: String,
  rating: Number,
});

const PlacementStats = mongoose.model('PlacementStat', {
  companiesVisited: String,
  placedStudents: String,
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema); 

// Register endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Check credentials in the database
  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const { username } = req.query;

    // Check if username is provided
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username query parameter is required' });
    }

    // Fetch user from the database
    const user = await User.findOne({ username });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    res.json({ success: false, message: 'Username or email already exists' });
  } else {
    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ success: true, message: 'Registration successful' });
  }
});

// Login endpoint for admin
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get all listed jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint for listing a job
app.post('/api/faculty/listJob', async (req, res) => {
  try {
    const { companyName, role, requirements, salary, applyLink } = req.body;
    const job = new Job({ companyName, role, requirements, salary, applyLink });
    await job.save();
    res.status(201).json({ message: 'Job listed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for listing a resource with file upload
app.post('/api/faculty/listResource', upload.single('pdfFile'), async (req, res) => {
  try {
    const { companyName, scopeOfResource } = req.body;
    const pdfFile = req.file.buffer;

    const resource = new Resource({ companyName, scopeOfResource, pdfFile });

    await resource.save();
    res.status(201).json({ message: 'Resource listed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// API endpoint to get all listed resources
app.get('/api/faculty/getResources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/api/submitForm', upload.single('pdf'), async (req, res) => {
  try {
    const { facultyName, subject, description } = req.body;

    // Check if PDF file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Save form data and PDF to MongoDB
    const formSubmission = new FormSubmission({
      facultyName,
      subject,
      description,
      pdf: req.file.buffer,
    });

    await formSubmission.save();

    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json({ message: 'Interview experience submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this to your Express.js server (index.js)
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await PlacementStats.find();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this to your Express.js server (index.js)
app.post('/api/stats', async (req, res) => {
  try {
    const { companiesVisited, placedStudents } = req.body;
    const newStat = new PlacementStats({ companiesVisited, placedStudents });
    await newStat.save();
    res.status(201).json({ message: 'Placement stats submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this to your Express.js server (index.js)
app.put('/api/stats/:id', async (req, res) => {
  try {
    const { companiesVisited, placedStudents } = req.body;
    const updatedStat = await PlacementStats.findByIdAndUpdate(
      req.params.id,
      { companiesVisited, placedStudents },
      { new: true }
    );
    res.status(200).json(updatedStat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this to your Express.js server (index.js)
app.delete('/api/stats/:id', async (req, res) => {
  try {
    await PlacementStats.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Placement stats deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
