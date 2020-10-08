import Sequelize from 'sequelize';
import UserToken from './UserToken.js';
import db from '../../config/database.js';

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullName: {
    type: Sequelize.STRING,
    field: 'full_name',
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  registeredAt: {
    type: Sequelize.DATE,
    field: 'registered_at',
    allowNull: false,
  },
  lastLoginAt: {
    type: Sequelize.DATE,
    field: 'last_login_at',
  },
  confirmedAt: {
    type: Sequelize.DATE,
    field: 'confirmed_at',
  },
}, {
  timestamps: false,
});




export default User;


// Add hooks to lowercase email and username?