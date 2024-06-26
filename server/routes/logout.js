const express = require('express');
const {authenticateToken} = require("../middleware/authenticateToken");
const router = express.Router();

router.post('/',  (req, res) => {

    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out' });

  })

module.exports = router;