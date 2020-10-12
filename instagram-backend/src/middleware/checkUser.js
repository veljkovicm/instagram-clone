import config from 'config';
import jwt from 'jsonwebtoken';

const checkUser = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    return res.status(401).json({ message: 'Not authorized!'})
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return res.status(200).json({ message: 'User is authenticated!', payload: decoded})
  } catch(e) {
    res.status(400).json({ message: 'Token is not valid'});
  }
}

export default checkUser;