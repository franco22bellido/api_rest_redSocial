import {DataTypes} from 'sequelize';
import sequelize from '../database/conectDB.js';



export const postSchema = sequelize.define('post', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING
    },
    img_url: {
        type: DataTypes.STRING
    }
})
