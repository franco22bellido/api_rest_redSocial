import {DataTypes} from 'sequelize';
import sequelize from '../database/conectDB.js';
import { postSchema } from './post.js';


export const userSchema = sequelize.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }
);

userSchema.hasMany(postSchema, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})
postSchema.belongsTo(userSchema,{
    foreignKey: 'user_id',
    targetKey: 'id'
});








