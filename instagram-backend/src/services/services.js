import db from '../../config/database.js';
import sequelize from 'sequelize';


// try replacing with 'bcrypt' package before deployment
import bcrypt from 'bcryptjs';

import { User, UserToken, Posts } from '../models/index.js';
import database from '../../config/database.js';


// separate to UserServices and EmailServices


// separate to more classes?

class Services {

  static async verifyUser ( userEmail, password ) {
    const user = await User.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      return {
        userIsVerified: false,
        user: {},
        message: 'User with this email does not exist!',
      }
    }

    const passwordsDoMatch = await bcrypt.compare(password, user.password);

    if (!passwordsDoMatch) {
      return {
        userIsVerified: false,
        user: {},
        message: 'Invalid credentials, try again.'
      }
    }

    if (!user.confirmedAt) {
      return {
        userIsVerified: false,
        user: {},
        message: 'User email not confirmed. Please check your inbox'
      }
    }

    const { id, email, username } = user;
    
    // TODO update last login time

    return { userIsVerified: true, user: { id, email, username }, message: 'User verified!' };

  };
  static async getUserById(id) {
    return User.findOne({
      where: { id },
    })
  }

  // TODO Refactor to check for email and username in one method
  static async userEmailExists (email) {
    const user = await User.findOne({
      where: { email: email }
    });
  
    return !!user;
  };

  // lowercase before checking
  static async usernameExists (username) {
    const user = await User.findOne({
      where: { username }
    });
  
    return !!user;
  };


  static async createUser ({ email, password, username, fullName }) {
    const hashedPassword = await  bcrypt.hash(password, 14);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      fullName,
      registeredAt: new Date(),
    });

    return { id: user.id, message: 'User was created successfully! Confirmation email has been sent to your inbox.'}
  }

  static async createUserToken (data) {

    console.log('>> data', data);
    return UserToken.create({
      createdAt: new Date(),
      ...data,
    })
  }

  static async findUserIdByToken({ token, type}) {
    const userData = await UserToken.findOne({
      attributes: ['user_id'],
      where: { token, type }
    });
    return userData.dataValues.user_id;
  }


  static async confirmEmail(id) {
    return User.update(
      { confirmedAt: new Date() },
      { where: { id } }
    );
  }

  static async confirmedUser(email) {
    const userData = await User.findOne({
      attributes: [ 'id', 'email', 'confirmed_at'],
      where: { email }
    });

    return {
      id: userData && userData.dataValues.id,
      email: userData && userData.dataValues.email,
      confirmed: userData && userData.dataValues.confirmed_at
    }
  }

  static async updateUserPassword({ token, password, userId }) {
    const hashedPassword = await bcrypt.hash(password, 14);

    await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    ).then(() => {
      return UserToken.update(
        { usedAt: new Date() },
        { where: { token, userId } }
      ).then(() => {
        return { message: 'Password updated successfully!'}
      })
      .catch(err => {
        console.log(err);
        return { message: 'Something went wrong!'}
      })
    });
  }

  static async search({ query}) {
    const Op = sequelize.Op;
    return User.findAll({
      attributes: ['username', ['full_name', 'fullName']],
      where: {
        username: {
          [Op.like]: `%${query}%`
        }
      }
    })
  };

  static async addNewPost({ fileName, caption, userId }) {
    return Posts.create({
      fileName,
      caption,
      userId,
      uploadedAt: new Date(),
    })
  }
}


export default Services; 