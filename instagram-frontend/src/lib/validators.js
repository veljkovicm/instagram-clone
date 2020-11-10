import validator from 'email-validator';

export const validateInput = ({ type, data }) => {
  if(type === 'username') {
    // return data.match(/([A-Z1-9_.])\w+/g);
    return data.match(/([A-Z1-9_.])\w+/);
  } else if (type === 'email') {
    return validator.validate(data)
  } else if (type === 'password') {
    return data.length > 2;
  }
}