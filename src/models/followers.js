import sequelize from '../database/conectDB.js';
import {DataTypes} from 'sequelize';
import { userSchema } from './user.js';
import { postSchema } from './post.js';

export const followerSchema = sequelize.define("follower" ,{
    /*pk compuesta*/
    followerId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idolId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: false
});



userSchema.hasMany(followerSchema, {
    foreignKey: 'followerId',
    sourceKey: 'id',
    as: 'followerId',
});
followerSchema.belongsTo(userSchema, {
    foreignKey: 'followerId',
    targetKey: 'id',
})


userSchema.hasMany(followerSchema, {
    foreignKey: 'idolId',
    sourceKey: 'id',
    as: 'idolId',
});
followerSchema.belongsTo(userSchema, {
    foreignKey: 'idolId',
    targetKey: 'id',
})


/**post echema tiene muchos users pero en la tabla followers  */
postSchema.belongsTo(followerSchema, {
    foreignKey: "user_id",
    targetKey: "idolId"
});
followerSchema.hasMany(postSchema, {
    foreignKey: "user_id",
    sourceKey: "idolId"
});