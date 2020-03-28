import { DataTypes, Model } from 'sequelize';
import { sequelize } from './config';
import { Comment } from './Comment';

export class Post extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public text!: string;
  public likes!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: sequelize,
  modelName: 'post',
  tableName: 'Post'
});

Post.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'postId',
  as: 'comment'
});

Post.sync({});