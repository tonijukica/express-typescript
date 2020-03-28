import { DataTypes, Model } from 'sequelize';
import { sequelize } from './config';
// import { User } from './User';
// import { Post } from './Post';

export class UserLikePost extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;

   
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

UserLikePost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: sequelize,
  modelName: 'userlikepost',
  tableName: 'UserLikePost'
});

// UserLikePost.hasMany(User, {
//   sourceKey: 'id',
//   foreignKey: 'userId',
//   as: 'user'
// });

// UserLikePost.hasMany(Post, {
//   sourceKey: 'id',
//   foreignKey: 'postId',
//   as: 'post'
// });

UserLikePost.sync({});