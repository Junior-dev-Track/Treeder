const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({IdUsers: user.IdUsers, Pseudo: user.Pseudo}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        res.json({accessToken: accessToken});
    });
});

module.exports = router;