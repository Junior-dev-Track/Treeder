const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.cookies) {
        console.error('Cookies are not available');
        return res.status(500).send('Internal server error');
    }

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        console.error('Refresh token is missing');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Error verifying refresh token:', err.message);
            return res.sendStatus(403); // Forbidden
        }

        const accessToken = jwt.sign({IdUsers: user.IdUsers, Pseudo: user.Pseudo}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        console.log('New access token:', accessToken);
        res.json({accessToken: accessToken});
    });
});

module.exports = router;