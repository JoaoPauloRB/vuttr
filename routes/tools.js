const Tools = require('../models/tools');
const router = require('express').Router();
const verifyJWT = require('../utils/verifyJWT');

/**
 * @openapi
 * /tools?tag={tag}:
 *   get:
 *     summary: Retorna a lista de exames
 *     parameters:
 *       - name: tag
 *         in: query
 *         description: Tag das ferramentas
 *         type: string
 *     responses:
 *       '200':
 *         description: Array com as ferramentas
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 type: object
 *                 porperties:
 *                   title: string
 *                   link: string
 *                   description: string
 *                   userId: string
 *                   tags: array
 *                   items:
 *                   type: string
 */
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

/**
 * @openapi
 * /tools:
 * delete:
 *  description: Remove uma ferramenta por id
 * responses:
 *  '204':
 *   - summary: Remove uma ferramenta por id
 */
router.delete('/tools/:id', verifyJWT, async (req, res, next) => {
    const id = req.params.id;
    await Tools.findByIdAndDelete(id);
    return res.status(204).json();
});

module.exports = router;