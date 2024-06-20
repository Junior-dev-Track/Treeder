const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out' });

  })

module.exports = router;