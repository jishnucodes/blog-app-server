import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token || req.headers['authorization'].split(' ')[1];
    
     if (token === null) return res.sendStatus(403);

     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
     })

};

export default authenticateToken;