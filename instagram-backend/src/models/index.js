import User from './User.js';
import UserToken from './UserToken.js';
import Posts from './Posts.js';

Posts.belongsTo = (User, {
  foreignKey: 'user_id',
});

User.hasMany(Posts, {
  foreignKey: 'id',
});


export {
  User,
  UserToken,
  Posts,
};