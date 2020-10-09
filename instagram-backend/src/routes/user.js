import express from 'express';
import Services from '../services/services.js';

import { generateAccountConfirmationToken } from '../lib/tokens.js';
import config from 'config';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/sign_up', async (req, res) => {
  const {
    email,
    password,
    username,
    fullName,
  } = req.body;


  // const userEmailExists = await Services.userEmailExists(email);
  
  // if (userEmailExists) {
  //   return res.send({
  //     statusCode: 401,
  //     payload: {},
  //     message: 'User with this email already exists!',
  //   }).status(401);
  // }

  // const usernameExists = await Services.usernameExists(username);
  
  // if (usernameExists) {
  //   return res.send({
  //     statusCode: 401,
  //     payload: {},
  //     message: 'User with this username already exists!',
  //   }).status(401);
  // }

  const { id, message } = await Services.createUser({ email, password, username });

  const token = generateAccountConfirmationToken();

  console.log({id, email, token});
  await Services.createUserToken({ userId: id, email, token, type: 'confirmation' });

  // await EmailServices.sendConfirmationEmail({ email, token });

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
    email,
    password,
    rememberMe,
  } = req.body;


  const { userIsVerified, user, message } = await Services.verifyUser(email, password);

  if (!userIsVerified) {
    return res.send({
      statusCode: 401,
      payload: {},
      message
    }).status(401);
  };

  const ttl = 60 * 60 * 24; // expire in a day

  const token = jwt.sign(
    { id: user.id},
    config.jwtSecret,
    { expiresIn: 3600 },
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
  console.log('>> token', token);

  const userId =  await Services.findUserIdByToken({ token, type: 'confirmation'});

  if (!userId || !token) {
    return res.send({
      statusCode: 404,
      message: 'Token not valid.'
    }).status(401);
  };

  await Services.confirmEmail(userId);

   res.status(200).json({ message: 'Your email address is confirmed. Please, log in.'})

  // Cannot set headers after they are sent to the client ???
  // .redirect('/');
});









router.get('/test', async (req, res) => {
  return res.send({
    statusCode: 200,
  }).status(200)
});


export default router;