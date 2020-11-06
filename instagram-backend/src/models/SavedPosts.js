import Sequelize from 'sequelize';
import db from '../../config/database.js';

const SavedPosts = db.define('saved_posts', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  postId: {
    type: Sequelize.UUID,
    field: 'post_id',
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    field: 'user_id',
    allowNull: false,
  },
  savedAt: {
    type: Sequelize.DATE,
    field: 'saved_at',
    allowNull: false,
  },
}, {
  timestamps: false,
});




export default SavedPosts;