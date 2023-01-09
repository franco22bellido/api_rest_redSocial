import sequelize from '../database/conectDB.js';
import {DataTypes} from 'sequelize';
import { postSchema } from './post.js';
import {userSchema} from './user.js';

export const likeSchema = sequelize.define('like',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false
});

/*pk compuesta*/
postSchema.belongsToMany(userSchema, {
    through: likeSchema
});

/**este esquema pertenece a, y támbien a: */
likeSchema.belongsTo(postSchema,{
    foreignKey: 'userId',
    targetKey: 'id'
});
likeSchema.belongsTo(userSchema,{
    foreignKey: 'postId',
    targetKey: 'id'
});




postSchema.hasMany(likeSchema, {
    foreignKey: "postId",
    sourceKey: "id"
});
userSchema.hasMany(likeSchema,{
    foreignKey: "userId",
    sourceKey: "id"
});