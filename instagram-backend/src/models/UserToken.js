import Sequelize from 'sequelize';
import db from '../../config/database.js';


const UserToken = db.define('user_tokens', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    field: 'user_id',
    primaryKey: true,
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    // one of [confirmation, password]
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
    allowNull: false,
  },
  usedAt: {
    type: Sequelize.DATE,
    field: 'used_at',
  }
  
}, {
  timestamps: false,
});



export default UserToken;


// Add hooks to lowercase email and username?