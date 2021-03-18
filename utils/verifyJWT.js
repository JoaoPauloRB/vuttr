const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Request without token' });
    
    const tokenWithoutBearer = token.split(' ')[1];
    jwt.verify(tokenWithoutBearer, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Fail to validate token' });
      
      req.userId = decoded.id;
      next();
    });
    return;
}