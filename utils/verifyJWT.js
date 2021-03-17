module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'Sem token na requisição!' });
    
    const tokenWithoutBearer = token.split(' ')[1];
    jwt.verify(tokenWithoutBearer, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha ao validar o token!' });
      
      req.userId = decoded.id;
      next();
    });
}