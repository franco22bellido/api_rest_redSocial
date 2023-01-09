import { likeSchema } from "../models/like.js";

let repository = {};

repository.getCountLikesPost = async(postId)=>{
    try {
        let countLikes= await likeSchema.findAndCountAll({
            where: {postId}
        });
        return countLikes.count;
    } catch (error) {
        return error.message
    }
}
repository.addLikePost = async(postId, userId)=>{
    try {
        
    const newLike= await likeSchema.create({
        postId,
        userId
    });

    return newLike;
    } catch (error) {
        if(error.message == 'Validation error'){
            return "ya le diste like a esa publicación"
        };
        return error.message;
    }
}
repository.deleteLike = async(postId, userId)=>{
    try {
        
    const destroyLike = await likeSchema.destroy({
        where: {
            postId,
            userId}});

    return destroyLike;
    } catch (error) {
       return error.message;
    }
}
repository.getAllLikes = async(userId)=>{
    try {
        const myLikes = await likeSchema.findAll({
            where: {userId}});

        return myLikes;
    } catch (error) {
        return error.message;
    }
}
/*count my likes */

export default repository;