const express = require('express');
const connectDB = require('./config/db');

// create the server
const app = express();

// Connect to database
connectDB();

// Enable express.json
app.use(express.json({ extended: true }))

// app port
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/logout', require('./routes/logout'));

// start the app
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});