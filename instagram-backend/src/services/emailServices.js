import config from 'config';
import sgMail from '@sendgrid/mail';

class EmailServices {
  static async sendConfirmationEmail ({ email, token }) {
    sgMail.setApiKey(config.sendGrid.key)
    console.log(config.sendGrid.sender)
    const linkUrl = config.sendGrid.confirmation.url + token;
    const msg = {
      to: 'marchello92@gmail.com', // replace with user email,
      from: config.sendGrid.sender,
      subject: 'Instagram Clone - Registraction confirmation email',
      // text: 'text?',
      html: '<p>TEST HTML</p>', // not needed with template?
      templateId: config.sendGrid.confirmation.template,
      dynamic_template_data: {
        name: 'Confirmation email',
        linkUrl: linkUrl,
      }
    };

    sgMail
      .send(msg)
      .then(() => {
        return console.log('Email sent');
      })
      .catch((error) => {
        console.error('ERROR', error);
      });
  }
}

export default EmailServices;