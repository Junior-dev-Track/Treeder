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
app.use('/user', userRoutes)
// app.use('/user/admin', userAdminRoutes)
app.use('/logsAdmin', logsRoutesAdmin)
app.use('/logsPlayer', logsRoutesPlayer)
app.use('/trees', treesRoutes)
app.use('/logout', logoutRoutes)
app.use('/refresh', refreshTokenRoutes)
app.use('/music', express.static('public/music'));
app.use('/*', (req, res) => {
  res.status(404).send('404 Not found');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new webSocket.Server({ port: 8000 });
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send data every 5 seconds
  setInterval(() => {
    ws.send(JSON.stringify({ data: 'Your data here' }));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});