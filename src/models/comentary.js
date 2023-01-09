import sequelize from '../database/conectDB.js';
import {DataTypes} from 'sequelize';
import { postSchema } from './post.js';
import {userSchema} from './user.js';

export const comentarySchema = sequelize.define('comentary',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    textComentary : {
        type: DataTypes.STRING
    }
},
    {timestamps: false}
);


/*con ese unique: false dentro del
objeto que recibe through desabilitamos la llave primaria compuesta
que sequelize nos trae por defecto.*/
userSchema.belongsToMany(postSchema, {
    through: {model: comentarySchema, unique: false}
});
comentarySchema.belongsTo(userSchema,{
    foreignKey: 'userId',
    targetKey: 'id'
});
comentarySchema.belongsTo(postSchema,{
    foreignKey: 'postId',
    targetKey: 'id'
});

// postSchema.belongsToMany(userSchema,{
//     through: {model: comentarySchema, unique: false}
// });

//entonces hay que hacer mas asociaciones para que sequelize sepa donde buscar