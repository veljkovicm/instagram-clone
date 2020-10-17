import Sequelize from 'sequelize';
import db from '../../config/database.js';

const Posts = db.define('posts', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.UUID,
    field: 'user_id',
    allowNull: false,
  },
  fileName: {
    type: Sequelize.STRING,
    field: 'file_name',
    allowNull: false,
  },
  caption: {
    type: Sequelize.STRING,
  },
  uploadedAt: {
    type: Sequelize.DATE,
    field: 'uploaded_at',
    allowNull: false,
  },
}, {
  timestamps: false,
});




export default Posts;


// Add hooks to lowercase email and username?