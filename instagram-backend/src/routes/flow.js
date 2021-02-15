import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import Services from '../services/services.js';
import EmailServices from '../services/emailServices.js';
import { validateInput } from '../lib/validators.js'
import { generateAccountConfirmationToken } from '../lib/tokens.js';


const router = express.Router();

router.post('/sign_up', async (req, res) => {
  const {
    email,
    password,
    username,
    fullName,
  } = req.body;

  const lowercaseEmail = email.toLowerCase();
  const lowercaseUsername = username.toLowerCase();

  const validData = validateInput(req.body);

  if (!validData) {
    return res.send({
      statusCode: 400,
      message: 'Invalid input!',
    }).status(400);
  }
  const userEmailExists = await Services.userEmailExists(lowercaseEmail);

  if (userEmailExists) {
    return res.send({
      statusCode: 401,
      payload: {},
      message: 'User with this email already exists!',
    }).status(401);
  }

  const usernameExists = await Services.usernameExists(lowercaseUsername);
  
  if (usernameExists) {
    return res.send({
      statusCode: 401,
      payload: {},
      message: 'User with this username already exists!',
    }).status(401);
  }

  const { id, message } = await Services.createUser({
    email: lowercaseEmail,
    username: lowercaseUsername,
    password,
    fullName,
  });

  const token = generateAccountConfirmationToken();

  await Services.createUserToken({
    type: 'confirmation',
    userId: id,
    email: lowercaseEmail,
    token,
  });

  await EmailServices.sendConfirmationEmail({ email: lowercaseEmail, token });

  return res.send({
    statusCode: 200,
    payload: {
      id,
      message,
    },
  }).status(200)
});


router.post('/sign_in', async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  const lowerCaseUsername = username.toLowerCase();

  const { userIsVerified, user, message, field } = await Services.verifyUser({ username: lowerCaseUsername, password });

  if (!userIsVerified) {
    return res.send({
      statusCode: 401,
      payload: {
        message,
        field,
      },
    }).status(401);
  };

  const ttl = 60 * 60 * 24 * 7; // expire in a week

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      website: user.website,
      bio: user.bio,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      avatar:  user.avatar,
    },
    config.jwtSecret,
    { expiresIn: ttl }, //seconds
  )

  return res.send({
    statusCode: 200,
    payload: {
      token,
      user,
      message,
    }
  }).status(200)
});


router.get('/confirm', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.send({
        statusCode: 404,
        message: 'Token not found.'
      })
      .status(401);
  };
  const { userId } =  await Services.findUserIdByToken({ token, type: 'confirmation'});

  if (!userId) {
    return res.send({
      statusCode: 404,
      message: 'User not found.'
    }).status(401);
  };

  await Services.confirmEmail(userId);

  return res.status(200)
    .json({ message: 'Your email address is confirmed. Please, log in.'});

  // Cannot set headers after they are sent to the client ???
  // .redirect('/');
});


router.post('/check-availability', async ( req, res) => {
  const { email, username } = req.body;
  
  if (email) {
    const lowerCaseEmail = email.toLowerCase();
    const isEmailTaken = await Services.emailAvailable(lowerCaseEmail);
    
    return res
    .json({
      statusCode: 200,
      taken: isEmailTaken,
    }).status(200);
    
  } else if (username) {
    const lowerCaseUsername = username.toLowerCase();
    const isUsernameTaken = await Services.usernameAvailable(lowerCaseUsername);

    return res.json({
      statusCode: 200,
      taken: isUsernameTaken,
    }).status(200);
  }
});


export default router;
