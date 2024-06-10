const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    let data = {
        "data": "data"
    }
    res.send(data);
});

module.exports = router;