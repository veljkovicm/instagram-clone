import Sequelize from 'sequelize';
import db from '../../config/database.js';

const Followers = db.define('followers', {
  // followedId
  id: {
    type: Sequelize.UUID,
    // field: 'followed_id',
    primaryKey: true,
  },
  followerId: {
    type: Sequelize.UUID,
    field: 'follower_id',
  
    primaryKey: true,
  },
  followedAt: {
    type: Sequelize.DATE,
    field: 'followed_at',
    allowNull: false,
  },
}, {
  timestamps: false,
});

// does not work without 'id' column in db?
// try with migration instead of creating manually



// my followers 
// return all where followedId = userId;

// i'm following
// return all where followerId = userId




export default Followers;