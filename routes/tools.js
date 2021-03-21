const Tools = require('../models/tools');
const router = require('express').Router();
const verifyJWT = require('../utils/verifyJWT');

/**
 * @swagger
 * /tools:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "tools"
 *     summary: "Retorna a lista de exames"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "tag"
 *         in: "query"
 *         description: "Tag das ferramentas"
 *         type: "string"
 *     responses:
 *       "401":
 *         description: "Não autorizado"
 *       "200":
 *         description: "Array com as ferramentas"
 *         schema: 
 *           type: "array"
 *           items: 
 *             $ref: "#/definitions/Tool"
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "tools"
 *     summary: "Adiciona uma ferramenta"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "Informações da ferramenta"
 *         in: "body"
 *         description: "Dados da ferramenta"
 *         schema:
 *           $ref: "#/definitions/Tool"
 *     responses:
 *       "401":
 *         description: "Não autorizado"
 *       "200":
 *         description: "Ferramenta adicionada"
 *         schema: 
 *           type: "array"
 *           items: 
 *             $ref: "#/definitions/Tool"
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "tools"
 *     summary: "Retorna a lista de exames"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id ferramenta"
 *         type: integer
 *     responses:
 *       "401":
 *         description: "Não autorizado"
 *       "204":
 *         description: "Ferramenta deletada"
 *   put:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - "tools"
 *     summary: "Altera uma ferramenta"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "Informações da ferramenta"
 *         in: "body"
 *         description: "Dados da ferramenta"
 *         $ref: "#/definitions/Tool"
 *     responses:
 *       "401":
 *         description: "Não autorizado"
 *       "200":
 *         description: "Ferramenta atualizada"
 *         schema: 
 *           type: "array"
 *           items: 
 *             $ref: "#/definitions/Tool"
 * definitions:
 *   Tool:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *       title:
 *         type: "string"
 *       link:
 *         type: "string"
 *       description:
 *         type: "string"
 *       userId:
 *         type: "string"
 *       tags:
 *          type: "array"
 *          items:
 *            type: "string" 
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

router.delete('/tools/:id', verifyJWT, async (req, res, next) => {
    const id = req.params.id;
    await Tools.findByIdAndDelete(id);
    return res.status(204).json();
});

module.exports = router;