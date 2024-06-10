const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable All CORS Requests
app.use(cors());

// Import the different routes
const indexRoutes = require('./routes/index');
const exempleRoutes = require('./routes/exemple');
const scoreRoutes = require('./routes/scoreboard')

// Use the routes
app.use('/autre', indexRoutes);
app.use('/exemple', exempleRoutes);
app.use('/score', scoreRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});