import db from '../../config/database.js';
import sequelize from 'sequelize';


// try replacing with 'bcrypt' package before deployment
import bcrypt from 'bcryptjs';

import {
  User,
  UserToken,
  Posts,
  Comments
} from '../models/index.js';
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

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      website: user.website,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      bio: user.bio,
      gender: user.gender,
    };
    
    // TODO update last login time

    return { userIsVerified: true, user: userData, message: 'User verified!' };

  };
  static async getUserById(id) {
    return User.findOne({
      where: { id },
    })
  }

  static async getUser(username) {
    console.log('>> username', username);
    return User.findOne({
      attributes: [
        'id',
        ['full_name', 'fullName'],
        'avatar'
      ],
      where: { username },
    });
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
    const userId = await UserToken.findOne({
      attributes: [['user_id', 'userId']],
      where: { token, type }
    });
    if(userId) {
      return userId;
    } else {
      return null;
    }
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

  static async getPosts({ userId }) {
    return Posts.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: [ 'username', 'avatar', ['full_name', 'fullName'] ],
        },
        {
          model: Comments,
          include: {
            model: User,
            attributes: [ 'username', 'avatar' ],
          },
        }
      ],
      logging: console.log,
    });
  }

  static async postComment({ comment, postId, userId}) {
    return Comments.create({
      comment,
      postId,
      userId,
      createdAt: new Date(),
    })
  }

  static async getComments(postId) {
    return Comments.fidnAll({
      where: { postId },
      include: [ User ]
    })
  }

  static async getPost({ postId }) {
    return Posts.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          attributes: [ 'username', 'avatar', ['full_name', 'fullName'] ],
        },
        {
          model: Comments,
          include: {
            model: User,
            attributes: [ 'username', 'avatar' ],
          },
        }
      ],
    });
  }
  static async getOldAvatarUrl(id) {
    return User.findOne({
      attributes: ['avatar'],
      where: { id }
    });
  }

  static async updateAvatar({ filename, userId }) {
    return User.update(
      { avatar: filename },
      { where: { id: userId } }
    );
  }

  static async updateUserSettings({ userData, id }) {
    const {
      username,
      email,
      fullName,
      avatar,
      gender,
      website,
      bio,
      phoneNumber,
    } = userData;

    const fields = { ...userData }
    return User.update(
      { ...fields },
      { where: { id } },
    )
    .then((res) => {
      console.log(res);
      return { message: 'User settings updated successfully!', statusCode: 200 }
    })
    .catch((err) => {
      console.log(err);
      return { message: 'User settings update failed!', statusCode: 500 }
    })
  }


}


export default Services; 