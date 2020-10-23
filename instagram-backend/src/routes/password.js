import express from 'express';
import Services from '../services/services.js';
import { generateResetPasswordToken } from '../lib/tokens.js';
import config from 'config';


const router = express.Router();

router.post('/forgot_password', async (req, res) => {

  const { email } = req.body;

  const userExists = await Services.confirmedUser(email);


  if(!userExists.email) {
    return res.status(404).json({
      statusCode: 404,
      message: 'User with this email does not exist.',
    });
  } else if (!userExists.confirmed) {
    return res.status(404).json({
      status: 401,
      message: 'User email not confirmed. Please check your inbox.',
    });
  }

  const token = generateResetPasswordToken();

  await Services.createUserToken({ userId: userExists.id, token, type: 'password'});

  // await EmailServices.sendConfirmationEmail({ email, token });

  return res.status(200).json({
    statusCode: 200,
    message: 'Reset password link has been sent to your email address',
  })
});


router.post('/reset_password', async (req, res) => {
  // const token = '443a35b88d21372a8fa9446c322f3fada996899150d22ddd2b83987394fa'

  const { newPassword, token } = req.body;

  const { userId }  = await Services.findUserIdByToken({
    token,
    type: 'password',
    usedAt: null
  });

  if(!userId) {
    return res.status(404).json({
      message: 'Token not valid.'
    });
  }

  await Services.updateUserPassword({
    token,
    password: newPassword,
    userId,
  });

  return res.send({
    statusCode: 200,
  }).status(200)
});


export default router;