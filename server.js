const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger');
require('dotenv').config();
require('./config/db');

const app = express();

// Log HTTP requests
app.use(morgan('combined')); // Use 'combined' format for detailed logging
app.use(cors());
app.use(bodyParser.json());

// Add the auth routes
app.use('/api/auth', authRoutes);

// Handle Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});