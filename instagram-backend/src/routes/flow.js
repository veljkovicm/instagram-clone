import express from 'express';
import Services from '../services/services.js';
import EmailServices from '../services/emailServices.js';
import { validateInput } from '../lib/validators.js'

import { generateAccountConfirmationToken } from '../lib/tokens.js';
import config from 'config';
import jwt from 'jsonwebtoken';
import path from 'path';

const router = express.Router();

router.post('/sign_up', async (req, res) => {
  const {
    email,
    password,
    username,
    fullName,
  } = req.body;

  const validData = validateInput(req.body);

  if (!validData) {
    return res.send({
      statusCode: 400,
      message: 'Invalid input!',
    }).status(400);
  }
  const userEmailExists = await Services.userEmailExists(email);
  
  if (userEmailExists) {
    return res.send({
      statusCode: 401,
      payload: {},
      message: 'User with this email already exists!',
    }).status(401);
  }

  const usernameExists = await Services.usernameExists(username);
  
  if (usernameExists) {
    return res.send({
      statusCode: 401,
      payload: {},
      message: 'User with this username already exists!',
    }).status(401);
  }

  const { id, message } = await Services.createUser({ email, password, username, fullName });

  const token = generateAccountConfirmationToken();

  console.log({id, email, token});
  await Services.createUserToken({ userId: id, email, token, type: 'confirmation' });

  await EmailServices.sendConfirmationEmail({ email, token });

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
    rememberMe,
  } = req.body;


  const { userIsVerified, user, message } = await Services.verifyUser(username, password);

  if (!userIsVerified) {
    return res.send({
      statusCode: 401,
      payload: {},
      message
    }).status(401);
  };

  const ttl = 60 * 60 * 24; // expire in a day

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
    { expiresIn: 3600 }, //seconds
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

router.post('/logout', async (req, res) => {

});


router.post('/confirm', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.send({
      statusCode: 404,
      message: 'Token not found.'
    }).status(401);
  };
  const { userId } =  await Services.findUserIdByToken({ token, type: 'confirmation'});

  if (!userId) {
    return res.send({
      statusCode: 404,
      message: 'User not found.'
    }).status(401);
  };

  await Services.confirmEmail(userId);
  // update used_at field in token table too

   res.status(200).json({ message: 'Your email address is confirmed. Please, log in.'})

  // Cannot set headers after they are sent to the client ???
  // .redirect('/');
});


// move to different file?
router.post('/check-availability', async( req, res) => {
  const { email, username } = req.body;

  if (email) {
    const isEmailTaken = await Services.emailAvailable(email.toLowerCase());
    return res.json({
      statusCode: 200,
      taken: isEmailTaken,
    }).status(200);
  } else if (username) {
    const isUsernameTaken = await Services.usernameAvailable(username.toLowerCase());
    return res.json({
      statusCode: 200,
      taken: isUsernameTaken,
    }).status(200);
  }
});


router.get('/test', async (req, res) => {
  return res.send({
    statusCode: 200,
  }).status(200)
});


export default router;