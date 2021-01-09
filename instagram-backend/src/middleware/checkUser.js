import config from 'config';
import jwt from 'jsonwebtoken';
import Services from '../services/services.js';

const checkUser = async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    return res.status(401).json({ message: 'Not authorized!'})
  }
  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);

    // Get current user data
    const user = await Services.getUserById(decodedToken.id);
    return res.status(200).json({ message: 'User is authenticated!', payload: user });
  } catch(e) {
    return res.status(400).json({ message: 'Token is not valid'});
  }
}

export default checkUser;