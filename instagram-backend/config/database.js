import Sequelize from 'sequelize';
import config from 'config';

const {
  tableName,
  userName,
  password,
  host,
} = config.db;

export default new Sequelize(tableName, userName, password, {
  host: host,
  dialect: 'postgres',
  dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
}
});