const Tools = require('../models/tools');
const router = require('express').Router();
const verifyJWT = require('../utils/verifyJWT');

router.get('/tools', verifyJWT, async (req, res, next) => {
    const tag = req.query.tag;
    const query = { userId: req.userId };
    if(tag) {
        query.tags =  { $in: [tag] };
    }
    res.json(await Tools.find(query).exec());
});

router.post('/tools', verifyJWT, async (req, res, next) => {
    const toolRequest = req.body;
    toolRequest.userId = req.userId;
    const insertedTool = await Tools.create(toolRequest)
    res.json(insertedTool);
});

router.put('/tools/:id', verifyJWT, async (req, res, next) => {
    const id = req.params.id;
    const toolRequest = req.body;    
    const updatedTool = await Tools.findByIdAndUpdate(id, toolRequest);
    res.json(updatedTool);
});

router.delete('/tools/:id', verifyJWT, async (req, res, next) => {
    const id = req.params.id;
    await Tools.findByIdAndDelete(id);
    return res.status(204).json();
});

module.exports = router;