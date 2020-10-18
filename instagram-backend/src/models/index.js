import User from './User.js';
import UserToken from './UserToken.js';
import Posts from './Posts.js';
import Comments from './Comments.js';

Posts.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Posts, {
  foreignKey: 'id',
});

Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comments, {
  foreignKey: 'id',
});

Posts.hasMany(Comments, {
  foreignKey: 'id'
})


export {
  User,
  UserToken,
  Posts,
};