import User from './User.js';
import UserToken from './UserToken.js';
import Posts from './Posts.js';
import Comments from './Comments.js';
import Followers from './Followers.js';
import Likes from './Likes.js';
import SavedPosts from './SavedPosts.js';

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
  as: 'followed',
  // foreignKey: 'followed_id',
  foreignKey: 'id',

});

Followers.belongsTo(User, {
  as: 'follower',
  foreignKey: 'follower_id',
});


Likes.belongsTo(Posts, {
  foreignKey: 'post_id',
  // foreignKey: 'id'
});

Likes.belongsTo(User, {
  foreignKey: 'user_id',
});


// needed?
// User.hasOne(Likes, {
//   foreignKey: 'id'
// })

// foreign key refers to Likes, not Posts?
Posts.hasMany(Likes, {
  foreignKey: 'post_id',
});


// Saved Posts
SavedPosts.belongsTo(Posts, {
  foreignKey: 'post_id',
});

User.hasMany(SavedPosts, {
  foreignKey: 'user_id',
});



export {
  User,
  UserToken,
  Posts,
  Comments,
  Followers,
  Likes,
};