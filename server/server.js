const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import the different routes
const indexRoutes = require('./routes/index');
const exempleRoutes = require('./routes/exemple');

// Use the routes
app.use('/', indexRoutes);
app.use('/exemple', exempleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});