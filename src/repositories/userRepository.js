import {userSchema} from '../models/user.js';

let repository = {};

repository.updateProfile = (id, body)=>{}

repository.deleteProfile = (userId)=>{}

repository.getUserById = async(userId)=>{
    try {
        const user = await userSchema.findByPk(userId);
        return user;
    } catch (error) {
        return error.message
    }

}
repository.getUserByUsername = async(username)=>{
    try {
        const user = await userSchema.findOne({where:{username}});
        return user;
    } catch (error) {
        return error.message
    }

}
export default repository;