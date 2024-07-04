const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Retrieve the token from the 'Authorization' header
  let authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ message: 'No Token' }); // If no token, return a 401 error (Unauthorized)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' }); // If the token is expired, return a 401 error
      }
      return res.status(403).json({ message: 'Invalid Token' }); // If the token is invalid, return a 403 error (Forbidden)
    }
    req.user = user; // Store the user information in the request
    next(); // Pass to the next middleware or route function
  });
}

module.exports = { authenticateToken };