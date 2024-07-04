const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const webSocket = require('ws');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Import the different routes
const indexRoutes = require('./routes/index');
const scoreRoutes = require('./routes/scoreboard');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/user');
const userLeafsRoutes = require('./routes/userLeafs');
const allUserRoutes = require('./routes/allUser');
const profileRoutes = require('./routes/profileUser');
const userAdminRoutes = require('./routes/admin');
const logsRoutesAdmin = require('./routes/logsAdmin');
const logsRoutesPlayer = require('./routes/logsPlayer');
const treesUserRoutes = require('./routes/userTrees');
const treesRoutes = require('./routes/trees');
const logoutRoutes = require('./routes/logout');
const refreshTokenRoutes = require('./routes/refresh');
const settingsRoutes = require('./routes/settings');
const deleteUserRoutes = require('./routes/deleteUser');

// Use the routes
app.use('/', indexRoutes);
app.use('/score', scoreRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/alluser', allUserRoutes)
app.use('/user', userRoutes)
app.use('/userLeafs', userLeafsRoutes)
app.use('/profile', profileRoutes)
app.use('/user/admin', userAdminRoutes)
app.use('/logsAdmin', logsRoutesAdmin)
app.use('/logsPlayer', logsRoutesPlayer)
app.use('/userTrees', treesUserRoutes)
app.use('/trees', treesRoutes)
app.use('/logout', logoutRoutes)
app.use('/refresh', refreshTokenRoutes)
app.use('/music', express.static('public/music'));
app.use('/settings', settingsRoutes)
app.use('/deleteUser', deleteUserRoutes)
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