import User from './User.js';
import UserToken from './UserToken.js';
import Posts from './Posts.js';
import Comments from './Comments.js';
import Followers from './Followers.js';

Posts.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Posts, {
  foreignKey: 'id',
});

Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id'
})

Comments.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comments, {
  foreignKey: 'id',
});

User.hasMany(Followers, {
  // as: 'followers',
  foreignKey: 'id',
});


Followers.belongsTo(User, {
  // as: 'followed',
  // foreignKey: 'followed_id',
  foreignKey: 'id',

});

// Followers.belongsTo(User, {
//   as: 'follower',
//   foreignKey: 'follower_id',
// });







export {
  User,
  UserToken,
  Posts,
  Comments,
  Followers,
};