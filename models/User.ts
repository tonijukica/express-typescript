import { DataTypes, Model } from 'sequelize';
import {sequelize} from './config';
export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: sequelize, 
  modelName: 'user',
  tableName: 'User'
});
User.sync({});