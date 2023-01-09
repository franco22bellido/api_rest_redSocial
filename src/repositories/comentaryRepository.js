import { comentarySchema } from "../models/comentary.js"
import { userSchema } from "../models/user.js";

let repository = {};

repository.createComent = async(postId, textComentary,userId)=>{
    try {
        
    const newComentary = await comentarySchema.create({
        userId,
        postId,
        textComentary
    });
    return newComentary;
    } catch (error) {
       return error.message;
    }

}
repository.deleteComentaryById = async(id)=>{
    try {
        const deleteComentary = comentarySchema.destroy({
            where: {id}
        })
        return deleteComentary;
    } catch (error) {
        return error.message;
    }
}
repository.updateComentById = async(id, body)=>{

    try {
    let updateComentary = await comentarySchema.findOne({
        where:{id}
    });

    updateComentary.set(body);

    await updateComentary.save();
    return updateComentary;
    } catch (error) {
        return error.message
    }
}
repository.getAllComents = async(userId)=>{

  try {
    //incluir 
    const coments = await comentarySchema.findAll({
        where: {userId },
        attributes: ['id','textComentary', 'postId']
    });

  return coments;  
  }catch (error) {
    return error.message;
  }
}
repository.getOne =async(id, userId)=>{
    try {
        let comentary = await comentarySchema.findOne({
            where: {id}
        });
        return comentary;
    } catch (error) {
        return error.message
    }
}
repository.countComents = async (postId)=>{
    try {
        let count = await comentarySchema.count({
            where: {postId}
        });
        return count;
    } catch (error) {
        return error.message;
    }
}
repository.comentsOfPost= async(postId)=>{
    try {
        let allComents = await comentarySchema.findAll({
            where: {postId},
            attributes: ['textComentary', 'postId', 'userId'],
            include: {
                model:userSchema, attributes: ['username']
            }
        });

        return allComents;
    } catch (error) {
        return error.message;
    }
}
//comentarios de una publicación

export default repository;