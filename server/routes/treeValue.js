const express = require('express');
const router = express.Router();
const treeController = require('../controller/treesController');

router.get('/', async (req, res) => {


    let treeId = { IdTree: req.query.IdTree};
    let user = { IdUsers: req.query.IdUsers};
    const treeControllerInstance = new treeController();

    let values = treeControllerInstance.treeValue(treeId);
    let price = treeControllerInstance.treePrice(treeId, user);
    let lock = treeControllerInstance.lockTree(treeId);


    let allValues= {value: values, price: price, lock: lock};
    res.status(200).send(allValues);
});

module.exports = router;