import config from 'config';
import jwt from 'jsonwebtoken';
import Services from '../services/services.js';

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    return res.status(401).json({ message: 'Not authorized!'})
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, config.jwtSecret);
  
    const user = await Services.getUserById(decodedToken.id);
    req.user = user;
    next();
  } catch(e) {
    return res.status(400).json({ message: 'Token is not valid'});
  }
}

export default auth;