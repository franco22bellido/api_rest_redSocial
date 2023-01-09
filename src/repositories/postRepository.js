import {postSchema} from '../models/post.js';
import { userSchema } from '../models/user.js';
import sequelize from '../database/conectDB.js';

let repository = {}



repository.createPost = async(text, img_url, userId)=>{
    
    try {
        const newPost = await postSchema.create({
            user_id: userId,
            text,
            img_url
        });
        return newPost;
    } catch (error) {
        return error.message;       
    }
}
repository.deletePost = async(postId, userId)=>{
   
    try {
        const destroyPost = await postSchema.destroy({
            where: {
                id: postId,
                user_id: userId
            }
        });    
        return destroyPost
    } catch (error) {
        return error.message;
    }

}
repository.updatePost = async(id, body, user_id)=>{

    try {
        const update = await postSchema.findOne({
            where: {id, user_id}
        });
        update.set(body);
        await update.save();
        return update;

    } catch (error) {
        return error.message;
    }
}
repository.getPosts = async(userId)=>{
    try {
        let myPosts= await postSchema.findAll({
            where: {user_id: userId}});
        return myPosts;
    } catch (error) {
        return error.message;
    }
}
repository.getOnePost = async(postId)=>{
    try {
        // include: [userSchema]s
        let post = await postSchema.findAll({
            where: {id: postId},
                include: {model: userSchema, attributes: ['username']}
            
        });
       
        return post;
    } catch (error) {
        return error.message;
    }
}
repository.popularPosts = async()=>{
    try {
        let publications = await postSchema.findAll({
            
            attributes: { exclude:["user_id"],
                include: [
                [sequelize.literal(`(select count(*) from likes
                where likes.postId = post.id)`), 'Likes']]},
            include: {model: userSchema, attributes: ["username"]},
            order: [["Likes", "desc"],["createdAt", "desc"]],
            limit: 10
        });
        
        return publications;
    } catch (error) {
        return error.message;
    }
    /**
     * primero cuenta total de likes y comentario. 
     * con eso los ordenamos por likes desc y createdBy y hacemos un limit de 10     
     */
}

export default repository;