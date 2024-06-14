const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import the different routes
const indexRoutes = require('./routes/index');
const scoreRoutes = require('./routes/scoreboard');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/user');
const userAdminRoutes = require('./routes/admin');
const logsRoutes = require('./routes/logs');
const treesRoutes = require('./routes/trees');
const logoutRoutes = require('./routes/logout');

// Use the routes
app.use('/', indexRoutes);
app.use('/score', scoreRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/user', userRoutes)
app.use('/user/admin', userAdminRoutes)
app.use('/logs', logsRoutes)
app.use('/trees', treesRoutes)
app.use('/logout', logoutRoutes)
app.use('/*', (req, res) => {
  res.status(404).send('404 Not found');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});