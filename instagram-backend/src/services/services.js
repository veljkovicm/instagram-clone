// try replacing with 'bcrypt' package before deployment
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import SavedPosts from '../models/SavedPosts.js';
import {
  User,
  UserToken,
  Posts,
  Comments,
  Followers,
  Likes,
} from '../models/index.js';

const { Op } = sequelize;


class Services {
  static async verifyUser ({ username, password }) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: username },
          { username: username },
        ]
      },
    });

    if (!user) {
      return {
        userIsVerified: false,
        user: {},
        message: 'User with this email does not exist!',
        field: 'email',
      }
    }

    const passwordsDoMatch = await bcrypt.compare(password, user.password);

    if (!passwordsDoMatch) {
      return {
        userIsVerified: false,
        user: {},
        message: 'Invalid credentials, try again.',
        field: 'password',
      }
    }

    if (!user.confirmedAt) {
      return {
        userIsVerified: false,
        user: {},
        message: 'User email not confirmed. Please check your inbox',
        field: 'email',
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

    return {
      userIsVerified: true,
      user: userData,
      message: 'User verified!'
    };
  };


  static async getUserById(id) {
    return User.findOne({
      attributes: [
        'id',
        'email',
        'fullName',
        'username',
        'avatar',
        'website',
        'bio',
        'phoneNumber',
        'gender',
      ],
      where: { id },
    })
  };


  static async getUser(username) {
    return User.findOne({
      attributes: [
        'id',
        ['full_name', 'fullName'],
        'avatar',
        'bio',
        'website',
      ],
      where: { username },
    });
  };


  static async userEmailExists (email) {
    const user = await User.findOne({
      where: { email: email }
    });

    return !!user;
  };


  static async usernameExists (username) {
    const user = await User.findOne({
      where: { username }
    });

    return !!user;
  };


  static async createUser ({ email, password, username, fullName }) {
    const hashedPassword = await  bcrypt.hash(password, 14);

    const user = await User.create({
      password: hashedPassword,
      registeredAt: new Date(),
      email,
      username,
      fullName,
    });

    return { id: user.id, message: 'User was created successfully! Confirmation email has been sent to your inbox.'}
  };


  static async createUserToken (data) {
    return UserToken.create({
      createdAt: new Date(),
      ...data,
    })
  };

  static async findUserIdByToken({ token, type }) {
    const userId = await UserToken.findOne({
      attributes: [['user_id', 'userId']],
      where: { token, type }
    });

    if(userId) {
      return userId;
    } else {
      return null;
    }
  };

  static async getUserIdByUsername(username) {
    return User.findOne({
      attributes: [ 'id' ],
      where: { username }
    });
  };


  static async confirmEmail(id) {
    return User.update(
      { confirmedAt: new Date() },
      { where: { id } }
    );
  };


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
  };

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
        return { message: 'Something went wrong!'}
      })
    });
  };


  static async search(query) {
    return User.findAll({
      attributes: [
        'username',
        ['full_name', 'fullName'],
        'avatar'
      ],
      where: {
        [Op.or]: {
          username: {
            [Op.iLike]: `%${query}%`,
          },
          fullName: {
            [Op.iLike]: `%${query}%`,
          },
        },
      },
    });
  };


  static async addNewPost({ fileName, caption, userId }) {
    return Posts.create({
      fileName,
      caption,
      userId,
      uploadedAt: new Date(),
    });
  };

  static async getUserPosts(userId) {
    return Posts.findAll({
      where: { userId },
      order: [
        [ 'uploaded_at', 'DESC' ]
      ],
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
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        },
        {
          model: Likes,
        }
      ],
    });
  };

  static async getFeedPosts(followingList, userId) {
    return Posts.findAll({
      where: {
        userId: {
          [Op.in]: [
            ...followingList,
            userId
          ],
        }
      },
      order: [
        [ 'uploaded_at', 'DESC' ],
        [ { model: Comments, as: 'Comments' }, 'created_at', 'ASC'],
      ],
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
        },
        {
          model: Likes,
        }
      ],
    });
  };


 static async getSavedPosts(userId) {
    return SavedPosts.findAll({
      where: { userId },
      order: [
        [ 'saved_at', 'DESC' ]
      ],
      include: [
        {
          model: Posts,
          include: [
            {
              model: Likes,
              attributes: ['id', ['user_id', 'userId']],
            },
            {
              model: Comments,
              include: {
                model: User,
              }
            },
            {
              model: User,
              attributes: [ 'username', 'avatar', ['full_name', 'fullName'] ],
            },
          ]
        },
      ],
    });
  };


  static async getSavedPostsList(userId) {
    const posts = await SavedPosts.findAll({
      where: { userId },
      attributes: [ ['post_id', 'id'] ],
    });

    return posts.map(({ id }) => id);
  };


  static async postComment({ comment, postId, userId }) {
    return Comments.create({
      comment,
      postId,
      userId,
      createdAt: new Date(),
    });
  };


  static async getComments(postId) {
    return Comments.fidnAll({
      where: { postId },
      include: [ User ],
    });
  };


  static async getPost(postId) {
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
        },
        {
          model: Likes,
        }
      ],
    });
  };


  static async getOldAvatarUrl(id) {
    return User.findOne({
      attributes: ['avatar'],
      where: { id }
    });
  };


  static async updateAvatar({ filename, userId }) {
    return User.update(
      { avatar: filename },
      { where: { id: userId } }
    );
  };


  static async updateUserSettings({ userData, id }) {
    const fields = { ...userData }
    return User.update(
      { ...fields },
      { where: { id } },
    )
    .then(() => {
      return { message: 'User settings updated successfully!', statusCode: 200 }
    })
    .catch(() => {
      return { message: 'User settings update failed!', statusCode: 500 }
    });
  };


  static async follow({ followerId, followedId }) {
    return Followers.create({
      id: followedId,
      followedAt: new Date(),
      followerId,
    });
  };


  static async unfollow({ followerId, followedId }) {
    try {
      return Followers.destroy({
        where: { followerId, id: followedId }
      });
    } catch(err) {
      console.log(err);
    }
  };


  static async isFollowing({ followerId, followedId }) {
    return Followers.findOne({
      where: { followerId, id: followedId }
    });
  };


  static async getFollowerCount(id) {
    return Followers.count({
      where: { id }
    });
  };


  static async getFollowingCount(id) {
    return Followers.count({
      where: { followerId: id }
    });
  };


  static async getFollowList({ listType, id }) {
    if(listType === 'follower') {
      return Followers.findAll({
        where: { id },
        include: [
          {
            model: User,
            as: 'follower',
            attributes: [ 'id', 'username', 'fullName', 'avatar']
          }
        ],
        // limit: 10, 
      });
    } else {
      return Followers.findAll({
        where: { followerId: id },
        include: [
          {
            model: User,
            as: 'followed',
            attributes: [ 'id', 'username', 'fullName', 'avatar']
          }
        ]
      });
    }
  };


  static async like({ postId, userId }) {
    return Likes.create({
      likedAt: new Date(),
      postId,
      userId,
    });
  };


  static async unlike({ postId, userId }) {
    return Likes.destroy(
      { where: { postId, userId }}
    );
  };


  static async savePost({ postId, userId }) {
    return SavedPosts.create({
      postId,
      userId,
      savedAt: new Date(),
    });
  };


  static async unsavePost({ postId, userId }) {
    return SavedPosts.destroy({
      where: { postId, userId }
    });
  };


  static async emailAvailable (email) {
    const user = await User.findOne({
      where: { email }
    });

    return !!user;
  };

  static async usernameAvailable (username) {
    const user =  await User.findOne({
      where: { username }
    });
    return !!user;
  };
};


export default Services;
