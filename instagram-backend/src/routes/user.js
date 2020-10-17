import express from 'express';
import Services from '../services/services.js';

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

  const { id, message } = await Services.createUser({ email, password, username, fullName });

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
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
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

router.post('/upload', async (req, res) => {
  if(req.file === null) {
    return res.json({
      statusCode: 400,
      message: 'No file uploaded!',
    }).status(400);
  }

  const __dirname = path.resolve();
  const { file } = req.files;
  const timestamp = new Date().getTime();
  const { caption } = req.body;
  const { id: userId } = req.user;

  const fileName = `${timestamp}-${file.name}`;

  file.mv(`${__dirname}/public/uploads/${fileName}`, err => {
    if(err) {
      console.error(err);
      return res.json({
        statusCode: 500,
        message: err,
      }).
      
      status(500);
    }
  });
  await Services.addNewPost({ fileName, caption, userId })

  res.json({
    statusCode: 200,
    fileName,
    filePath: `/uploads/${fileName}`,
  }).status(200);
  
});



router.get('/test', async (req, res) => {
  return res.send({
    statusCode: 200,
  }).status(200)
});


export default router;