import Sequelize from 'sequelize';
import db from '../../config/database.js';

const Likes = db.define('likes', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  postId: {
    type: Sequelize.UUID,
    field: 'post_id',
    // primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    field: 'user_id',
    // primaryKey: true,
    allowNull: false,
  },
  likedAt: {
    type: Sequelize.DATE,
    field: 'liked_at',
    allowNull: false,
  },
}, {
  timestamps: false,
});




export default Likes;