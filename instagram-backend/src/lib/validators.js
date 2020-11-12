import validator from 'email-validator';

export const validateInput = (data) => {
  const validatedData = {
    emailValid: validator.validate(data.email),
    usernameValid: data.username.match(/([A-Za-z0-9]{3,15}$)+/),
    passwordValid: data.password.length >= 2,
    usernameValid: data.fullName.split(' ').length >= 2,
  }
  return Object.values(validatedData).every(i => i === true);
}