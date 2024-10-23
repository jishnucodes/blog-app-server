import jwt from 'jsonwebtoken'

export default function generateAccessToken(user) {
    return jwt.sign({id: user._id, username: user.username}, process.env.TOKEN_SECRET, { expiresIn: '24hr' });
};