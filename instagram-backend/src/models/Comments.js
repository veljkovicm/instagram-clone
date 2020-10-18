import Sequelize from 'sequelize';
import db from '../../config/database.js';

const Comments = db.define('comments', {
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
    type: Sequelize.UUID,
    field: 'user_id',
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
    allowNull: false,
  },
}, {
  timestamps: false,
});




export default Comments;