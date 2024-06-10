const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    let data = {
        "data": "index"
    }
    res.send(data);
});

module.exports = router;