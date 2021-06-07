import { sendMail } from '../lib/mailSender';

class EmailServices {
  static async sendConfirmationEmail ({ email, token }) {
    return sendMail({
      type: 'confirmation',
      token,
      email,
    });
  }

  static async sendResetPasswordEmail ({ email, token }) {
    return sendMail({
      type: 'passwordReset',
      token,
      email,
    });
  }
}

export default EmailServices;
