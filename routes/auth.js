const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       tags:
 *         - "user"
 *       produces:
 *         - "application/json"
 *       parameters:
 *       - name: "user"
 *         in: "body"
 *         description: "Dados do login"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *       responses:
 *         "200":
 *           description: "token do login"
 *           schema: 
 *             type: "object"
 *             properties: 
 *               token:
 *                 type: "string"
 *   /signup:
 *     post:
 *       tags:
 *         - "user"
 *       produces:
 *         - "application/json"
 *       parameters:
 *       - name: "user"
 *         in: "body"
 *         description: "Dados do login"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *       responses:
 *         "200":
 *           description: "token do login"
 *           schema: 
 *             type: "object"
 *             properties: 
 *               token:
 *                 type: "string"
 * definitions:
 *   User:
 *     type: "object"
 *     properties:
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 */
router.post('/login', async (req, res) => {
    const userRequest = req.body;
    const user = await User.findOne({ email: userRequest.email }).exec();
    if(user && bcrypt.compareSync(userRequest.password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 3600
        });
        return res.json({ token: `Bearer ${token}` });
    }

    return res.status(500).json({ message: 'Invalid Login' });
});

router.post('/signup', async (req, res) => {
    const userRequest = req.body;
    const salt = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
    const user = await User.findOne({ email: userRequest.email });
    if(user) {
        return res.status(409).json({ message: "Email already exists"});
    }

    const userToSave = new User({
        email: userRequest.email,
        password: bcrypt.hashSync(userRequest.password, salt)
    });
    
    userToSave.save((err, result) => {
        if(err) {
            return res.status(500).json({ message: 'Error when registering' });
        }
        const token = jwt.sign({ id: result._id }, process.env.SECRET, {
            expiresIn: 3600
        });
        return res.json({ token: `Bearer ${token}` });
    });

    return;
});

module.exports = router;