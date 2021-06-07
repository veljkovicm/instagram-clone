import config from 'config';
import sgMail from '@sendgrid/mail';

export const sendMail = ({
  type,
  token,
  email,
}) => {
  sgMail.setApiKey(config.sendGrid.key);

  const linkUrl = config.sendGrid[type].url + token;

  sgMail
    .send({
      to: email,
      from: config.sendGrid.sender,
      subject: `Instagram Clone - ${config.sendGrid[type].subject}`,
      templateId: config.sendGrid[type].template,
      dynamic_template_data: {
        subject: `Instagram Clone - ${config.sendGrid[type].subject}`,
        name: config.sendGrid[type].name,
        linkUrl: linkUrl,
      }
    })
    .then(() => console.log('Email sent'))
    .catch((error) => console.error('ERROR', error));
}