import { DataTypes, Model } from 'sequelize';
import {sequelize} from './config';

export class Comment extends Model {
  public id!: number;
  public postId!: number;
  public userId!: number;
  public text!: string;
  public likes!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: sequelize,
  modelName: 'comment',
  tableName: 'Comment'
});

Comment.sync();