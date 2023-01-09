import { Sequelize } from "sequelize";
import keys from "../keys.js";


const sequelize = new Sequelize(keys.name_db, keys.user_db, keys.password_db,{
    host: keys.host_db,
    dialect:"mysql"
});

export default sequelize;