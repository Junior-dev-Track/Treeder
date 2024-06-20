const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// Import the different routes
const indexRoutes = require('./routes/index');
const scoreRoutes = require('./routes/scoreboard');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
// const userRoutes = require('./routes/user');
// const userAdminRoutes = require('./routes/admin');
const logsRoutesAdmin = require('./routes/logsAdmin');
const logsRoutesPlayer = require('./routes/logsPlayer');
const treesRoutes = require('./routes/trees');
const logoutRoutes = require('./routes/logout');
const refreshTokenRoutes = require('./routes/refreshToken');


// Use the routes
app.use('/', indexRoutes);
app.use('/score', scoreRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
// app.use('/user', userRoutes)
// app.use('/user/admin', userAdminRoutes)
app.use('/logsAdmin', logsRoutesAdmin)
app.use('/logsPlayer', logsRoutesPlayer)
app.use('/trees', treesRoutes)
app.use('/logout', logoutRoutes)
app.use('/refresh', refreshTokenRoutes)
app.use('/*', (req, res) => {
  res.status(404).send('404 Not found');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});