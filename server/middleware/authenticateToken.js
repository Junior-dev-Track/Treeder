const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Récupérez le token de l'en-tête 'Authorization'
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401); // Si aucun token, renvoyez une erreur 401 (Non autorisé)

  

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403); // Si le token est invalide, renvoyez une erreur 403 (Interdit)
    req.user = user; // Stockez les informations de l'utilisateur dans la requête
    next(); // Passez au prochain middleware ou à la fonction de route
  });
}

module.exports = { authenticateToken };