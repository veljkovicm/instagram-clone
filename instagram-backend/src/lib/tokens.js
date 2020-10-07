import crypto from 'crypto';

export const generateAccountConfirmationToken = () => (
  crypto.randomBytes(30).toString('hex')
);

export const generateResetPasswordToken = () => (
  crypto.randomBytes(30).toString('hex')
);
