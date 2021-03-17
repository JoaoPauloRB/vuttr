const Tools = require('../models/tools');
const router = require('express').Router();
const verifyJWT = require('../utils/verifyJWT');

router.get('/tools', verifyJWT, async (req, res, next) => {
    const tag = req.query.tag;
    const query = {};
    if(tag) {
        query.tags = { $elementMatch: tag };
    }
    res.json(await Tools.find(query).exec());
});

router.post('/tools', verifyJWT, (req, res, next) => {
    const toolRequest = req.body;
    res.json(await Tools.create(toolRequest));
});

router.put('/tools/:id', verifyJWT, (req, res, next) => {
    const id = req.params.id;
    const toolRequest = req.body;
    res.json(await Tools.findByIdAndUpdate(id, toolRequest));
});

router.delete('/tools/:id', verifyJWT, (req, res, next) => {
    const id = req.params.id;
    await Tools.findByIdAndDelete(id);
    return res.status(204);
});