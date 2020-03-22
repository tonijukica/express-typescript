import {Sequelize} from 'sequelize';

const {DB_NAME, DB_USER, DB_PW, DB_HOST} = process.env;
export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PW, {
  host: DB_HOST,
  dialect: 'postgres'
});
