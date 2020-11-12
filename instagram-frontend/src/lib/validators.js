import validator from 'email-validator';

export const validateInput = ({ type, data }) => {
  if(type === 'username') {
    return data.match(/([A-Za-z0-9]{3,15}$)+/);
  } else if (type === 'email') {
    return validator.validate(data)
  } else if (type === 'password') {
    return data.length >= 2;
  } else if (type === 'full-name') {
    return data.split(' ').length >= 2;
    // TODO: regex for name - only letters, min 2 words
  }
}