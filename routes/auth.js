const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.post('/login', async (req, res) => {
    const userRequest = req.body;
    const user = await User.find({ email: userRequest.email }).exec();
    if(bcrypt.compareSync(userRequest.password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 3600
        });
        return res.json({ token });
    }

    return res.status(500).json({ message: 'Login inválido!' });
});

router.post('/signup', async (req, res) => {
    const userRequest = req.body;
    const user = new User({
        email: userRequest.email,
        password: bcrypt.hashSync(userRequest.password, process.env.SALT_ROUNDS || 10)
    });
    
    user.save((err, result) => {
        if(err) {
            return res.status(500).json({ message: 'Erro ao efetuar cadastro!' });
        }
        const token = jwt.sign({ id: result }, process.env.SECRET, {
            expiresIn: 3600
        });
        return res.json({ token });
    });

    return;
});

module.exports = router;