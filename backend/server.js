const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Student Routes Register करा
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
    res.send('Student Management System API is Running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});