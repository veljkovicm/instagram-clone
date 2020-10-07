import config from 'config';
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    res.status(401).json({ message: 'Not authorized!'})
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
  
    // Add user from payload
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({ message: 'Token is not valid'});
  }
}

export default auth;